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