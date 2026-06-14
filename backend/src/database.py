from motor.motor_asyncio import AsyncIOMotorClient
from src.models.create_task import Task
from src.models.update_task import updateTask
import os 
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

client = AsyncIOMotorClient(os.environ.get("URL"))
database = client.tasksdb
collection = database.tasks

async def get_task_id(id):
    task = await collection.find_one({'_id': ObjectId(id)})
    return task

async def get_all_tasks():
    tasks = []
    cursor = collection.find({})
    async for document in cursor:
        tasks.append(Task(**document))
    return tasks

async def get_task_title(title):
    task = await collection.find_one({'title': title})
    return task

async def create_task(taks):
    new_task = await collection.insert_one(taks)
    created_tasks = await collection.find_one({'_id': new_task.inserted_id})
    return created_tasks

async def update_task(id:str, data: updateTask):
    print(type(data))
    task = {k:v for k, v in data.model_dump().items() if v is not None}
    await collection.update_one({'_id': ObjectId(id)}, {'$set': task})
    document = await collection.find_one({'_id': ObjectId(id)})
    return document

async def delete_task(id):
    await collection.delete_one({'_id': ObjectId(id)})
    return True
