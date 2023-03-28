from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from db_config import collection_users
from auth.authmodels import AuthUserInfo, TokenData
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from dotenv import load_dotenv
from bson.json_util import dumps
import json
import os


load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token")


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES=120


def register_user(name, email, hashed_password):
    new_user = {
        "name": name,
        "username": email,
        "hashed_password": hashed_password,
    }
    result = collection_users.insert_one(new_user)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str):
    userdata = collection_users.find_one({"username":username})
    if userdata:
        return userdata


def verify_user(username: str):
    userdata = dumps(collection_users.find_one({"username":username}))
    if userdata:
        userjson = json.loads(userdata)
        verified_user = {
            "name": userjson["name"],
            "email": userjson["username"]
        }
        return verified_user


def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(email=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def change_hashed_password(username: str, password: str):
    try:
        updated_password = collection_users.update_one({"username": username}, {"$set":{
          "hashed_password": password
        }}, upsert=True)
        return {}
    except:
        raise HTTPException(status_code=402)
