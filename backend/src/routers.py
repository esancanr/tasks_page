from fastapi import APIRouter, HTTPException
from src.database import get_all_tasks, get_one_task, create_task, get_task
from src.models import Task

router = APIRouter(
    prefix="/api"
)     

@router.get('/tasks')
async def get_tasks():
    tasks = await get_all_tasks()
    return tasks

@router.get('/task/{id}')
async def get_task():
    task = await get_task()
    return task 

@router.post('/create-task', response_model = Task)
async def post_tasks(task: Task):
    foundTask = await get_one_task(task.title)
    if foundTask:
        raise HTTPException(409, 'Task already exists')
    
    result = await create_task(task.model_dump())
    if result:
        return result
    raise HTTPException(400, 'Something went wrong')
