from fastapi import FastAPI

app = FastAPI()

@app.get('/users')
def welcome ():
 return {'message': 'Welcome to fastAPI'}

