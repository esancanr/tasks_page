from typing import Optional, Annotated
from pydantic import BaseModel, Field, BeforeValidator
from bson import ObjectId


PyObjectId = Annotated[
    str,
    BeforeValidator(lambda v: str(v))
]


class Task(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)
    title: str
    description: str
    completed: bool = False

    class ConfigDict:
        orm_mode = True
        allow_population_by_field_name = True
        json_encoders = {
            ObjectId: str
        }