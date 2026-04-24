from typing import Any

from fastapi.responses import JSONResponse


def success_response(data: Any = None, message: str = "ok") -> dict[str, Any]:
    """统一成功返回格式。"""
    return {"code": 0, "message": message, "data": data}


def error_response(code: int, message: str, status_code: int) -> JSONResponse:
    """统一错误返回格式。"""
    return JSONResponse(
        status_code=status_code,
        content={"code": code, "message": message, "data": None},
    )
