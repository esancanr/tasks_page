from fastapi import APIRouter, HTTPException
from src.database import get_all_tasks, get_task_id, create_task, get_task_title, delete_task, update_task
from src.models.create_task import Task
from src.models.update_task import updateTask

router = APIRouter(
    prefix="/api"
)     

@router.get('/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks

@router.get('/task/{id}', response_model=Task)
async def get_task(id : str):
    task = await get_task_id(id)
    if task:
        return task
    raise HTTPException(404, f"Task with id:{id} not found  ")

@router.post('/create-task', response_model = Task)
async def post_tasks(task:Task):
    foundTask = await get_task_title(task.title)
    if foundTask:
        raise HTTPException(409, 'Task already exists')
    
    result = await create_task(task.model_dump())
    if result:
        return result
    raise HTTPException(400, 'Something went wrong')

@router.delete('/task/{id}')
async def remove_task(id : str):
    result = await delete_task(id)
    if result:
        return "Deleted task"
    raise HTTPException(404, f"Task with id:{id} not found")

@router.put('/task/{id}', response_model=updateTask)
async def put_task(id:str, task:updateTask):
    response = await update_task(id, task)
    if response:
        return response
    return HTTPException(404, f"Task with id:{id} not found")