"""Start up file of ConvRPA Server"""
import traceback
import uvicorn
from colorama import Fore
from fastapi import FastAPI, Request, Response
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()


@app.on_event("shutdown")
async def shutdown():
    """
    shut down event
    """
    print("ConvRPA Service Shutdown!")


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """handle validation exception

    Args:
        request (Request): _description_
        exc (RequestValidationError): _description_

    Returns:
        _type_: _description_
    """
    return JSONResponse(
        status_code=400,
        content={"status": "failed", "message": exc.errors()}
    )

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from backend.application.routers import conv

app.include_router(conv.router)


if __name__ == "__main__":

    uvicorn.run(app="ConvRPA.application.app:app",
                host="localhost",
                port="8090",
                reload=True,
                workers=1)
