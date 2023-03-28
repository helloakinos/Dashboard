from fastapi import Depends, APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from auth.auth import register_user, get_user, verify_user, authenticate_user, create_access_token, get_current_user, get_password_hash, change_hashed_password, ACCESS_TOKEN_EXPIRE_MINUTES
from auth.authmodels import AuthUserInfo, Token
from datetime import timedelta


authRouter = APIRouter(
    prefix="/auth",
    tags=["authentication"]
)


# Route handlers for user authentication
@authRouter.post("/register", status_code=201)
async def register(auth_userinfo: AuthUserInfo):
    existing_user = get_user(auth_userinfo.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="This email is already in use")     
    hashed = get_password_hash(auth_userinfo.password)
    register_user(auth_userinfo.name, auth_userinfo.email, hashed)
    return {}



@authRouter.post("/token", response_model=Token)
async def login_for_access_token(auth_userinfo: AuthUserInfo):
    print(auth_userinfo.email, auth_userinfo.password)
    user = authenticate_user(auth_userinfo.email, auth_userinfo.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    print(access_token)
    return {"access_token": access_token, "token_type": "bearer"}


@authRouter.post("/verify", status_code=200)
async def verify_email(auth_userinfo: AuthUserInfo):
    verified_user = verify_user(auth_userinfo.email)
    if verified_user:
        return verified_user
    else:
        raise HTTPException(status_code=400, detail="No user registered with this email")  


@authRouter.put("/newpassword", status_code=201)
async def change_password(auth_userinfo: AuthUserInfo):
    print(auth_userinfo)
    hashed = get_password_hash(auth_userinfo.password)
    print(hashed)
    try:
        await change_hashed_password(auth_userinfo.email, hashed)
        return {}
    except:
        raise HTTPException(status_code=400, detail="Unable to update password in database")   


