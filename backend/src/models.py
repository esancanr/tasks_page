from pydantic import BaseModel

class Task(BaseModel):
    id : str
    tittle : str
    description : str
    completed : bool = False