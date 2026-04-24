from fastapi import APIRouter

from app.models.schemas import LoginRequest, RegisterRequest
from app.services.auth_service import login_user, register_user
from app.utils.response import success_response

router = APIRouter(tags=["auth"])


@router.post("/register")
async def register(payload: RegisterRequest):
    data = await register_user(payload)
    return success_response(data=data, message="注册成功")


@router.post("/login")
async def login(payload: LoginRequest):
    data = await login_user(payload)
    return success_response(data=data, message="登录成功")
