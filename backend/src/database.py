from motor.motor_asyncio import AsyncIOMotorClient
from src.models import Task
import os 
from dotenv import load_dotenv

load_dotenv()

client = AsyncIOMotorClient(os.environ.get("URL"))
database = client.tasksdb
collection = database.tasks

async def get_one_task(id):
    task = await collection.find_one({'_id': id})
    return task

async def get_all_tasks():
    tasks = []
    cursor = collection.find({})
    async for document in cursor:
        tasks.append(Task(**document))
    return tasks

async def create_task(taks):
    new_task = await collection.insert_one(taks)
    created_tasks = await collection.find_one({'_id': new_task.inserted_id})
    return created_tasks

async def create_task(id, task):
    await collection.update_one({'_id': id}, {'$set': task})
    document = await collection.find_one({'_id': id})
    return document

async def delete_task(id):
    await collection.delete_one({'_id': id})
    return True
