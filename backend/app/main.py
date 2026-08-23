from fastapi import FastAPI
from app.api.chat import router as chat_router
from app.core.logging_config import setup_logging

setup_logging()

app = FastAPI()

app.include_router(chat_router)

@app.get("/")
def read_root():
    return {"message":"GenAI Bootcamp Backend"}