from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from routers import authrouter, datarouter

origins = [
    "http://localhost:3000",
    "https://master.d2xdfkdtr3gc9i.amplifyapp.com"
]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(authrouter.authRouter)
app.include_router(datarouter.dataRouter)
