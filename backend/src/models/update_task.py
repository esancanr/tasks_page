from typing import Optional, Annotated
from pydantic import BaseModel, Field, BeforeValidator
from bson import ObjectId


PyObjectId = Annotated[
    str,
    BeforeValidator(lambda v: str(v))
]

class updateTask(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)
    title: Optional[str] = None
    description: Optional[str] = None
    completed:  Optional[bool] = None

    class ConfigDict:
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }