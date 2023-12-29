"""conv module."""

from datetime import datetime
import time
import json
import os
import traceback
from typing import Dict, List, Union
import uuid
import zipfile
from fastapi import APIRouter, Body, Depends, File, Form, UploadFile, Query
from pydantic import BaseModel
import requests
import openai

from ..schemas.response_body import ResponseBody


router = APIRouter(prefix="/conv",
                   tags=["conv"],
                   responses={404: {"description": "Not found"}})



@router.post("/test")
def test(param: Dict) -> ResponseBody:
    """test
    
    """
    try:
        print(f"received: ", param)
        pass
    except Exception as e:
        traceback.print_exc()
        return ResponseBody(data=None,
                            success=False,
                            message=str(e))
    
    return ResponseBody(data=json.dumps({"hello": "world"}),
                        success=True,
                        message="success")

@router.post("/chat")
def chat(param: Dict) -> ResponseBody:
    """
    chat
    """
    message = param.get("message")
    print(param)

    try:
        print(f"received: ", param)
        openai.api_base = os.environ['OPENAI_API_BASE']
        openai.api_key = os.environ['OPENAI_API_KEY']
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo-16k",
            messages=[{"role": "user", "content": message}],
        )
        result = response['choices'][0]['message']['content']
        return ResponseBody(data=json.dumps({"hello": "world"}),
                            success=True,
                            message=result)
    except Exception as e:
        traceback.print_exc()
        return ResponseBody(data=None,
                            success=False,
                            message=str(e))

@router.post("/execution")
def execution(param: Dict) -> ResponseBody:
    """
    execution
    """
    message = param.get("message")
    print(param)

    try:
        exec(message)
        result = "success"
        return ResponseBody(data=json.dumps({"hello": "world"}),
                            success=True,
                            message=result)
    except Exception as e:
        traceback.print_exc()
        return ResponseBody(data=None,
                            success=False,
                            message=str(e))


@router.post("/button")
def button(param: Dict) -> ResponseBody:
    """
    button
    """
    action = param.get("action")
    print(param)

    try:
        # run command
        import subprocess
        subprocess.Popen(action, shell=True)
        result = "success"
        return ResponseBody(data=json.dumps({"hello": "world"}),
                            success=True,
                            message=result)
    except Exception as e:
        traceback.print_exc()
        return ResponseBody(data=None,
                            success=False,
                            message=str(e))
