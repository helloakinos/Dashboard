from pydantic import BaseModel
from typing import Optional
import pydantic

class Token(BaseModel):
    access_token: str
    token_type: str



class TokenData(BaseModel):
    email: Optional[str] = None


class AuthUserInfo(BaseModel):
    name: Optional[str]
    email: str
    password: Optional[str]
    hashed_password: Optional[str]
