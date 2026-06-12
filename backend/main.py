from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from src.routers import router



app = FastAPI() 
app.include_router(router)


@app.get(
    "/",
    include_in_schema=False, 
    summary="API Documentation Redirect",
    description="Redirects to the interactive API documentation."
)
async def docs_redirect():
    """
    Redirect to API documentation.
    """
    return RedirectResponse(url='/docs') 