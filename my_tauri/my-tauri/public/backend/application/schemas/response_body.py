"""Response body"""
import json
from typing import Union

from pydantic import BaseModel, Json


class ResponseBody(BaseModel):
    """Response body
    """
    data: Union[str, dict, list, Json, None] = None
    success: bool = True
    message: Union[str, None] = None

    def to_dict(self):
        """to dict
        """
        return self.dict()

    def to_json(self):
        """to json
        """
        return self.json()
