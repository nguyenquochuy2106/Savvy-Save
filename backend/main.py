from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import auth_controller, transaction_controller, stats_controller

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_controller.router, prefix="/auth", tags=["Authentication"])
app.include_router(transaction_controller.router, prefix="/transactions", tags=["Transactions"])
app.include_router(stats_controller.router, prefix="/stats", tags=["Stats"])

@app.get("/")
def root():
    return {"message": "Welcome to Savvy - Save API"}
