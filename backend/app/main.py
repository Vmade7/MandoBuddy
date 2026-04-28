from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.routers.auth import router as auth_router
from app.routers.progress import router as progress_router
from app.routers.pronunciation import router as pronunciation_router
from app.routers.users import router as users_router
from app.utils.exceptions import AppException
from app.utils.response import error_response, success_response

app = FastAPI(title="MandoBuddy Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:4173",   # Vite preview
        "http://127.0.0.1:5173",
        "http://127.0.0.1:4173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return success_response({"status": "healthy"}, "服务运行正常")


@app.exception_handler(AppException)
async def app_exception_handler(_: Request, exc: AppException):
    return error_response(code=exc.code, message=exc.message, status_code=exc.status_code)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={
            "code": 1003,
            "message": "请求参数校验失败",
            "data": exc.errors(),
        },
    )


@app.exception_handler(Exception)
async def unknown_exception_handler(_: Request, exc: Exception):
    return error_response(code=9999, message=f"服务器内部错误: {exc}", status_code=500)


app.include_router(auth_router)
app.include_router(users_router)
app.include_router(progress_router)
app.include_router(pronunciation_router)
