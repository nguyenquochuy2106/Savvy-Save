from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from backend.controllers import auth_controller, transaction_controller, stats_controller

app = FastAPI()

auth_scheme = HTTPBearer()

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    token = credentials.credentials
    # Add logic to verify the token with Supabase or your auth provider
    if not token:  # Replace with actual verification logic
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    return token

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

@app.get("/protected-route")
def protected_route(token: str = Depends(verify_token)):
    return {"message": "You have access to this route"}
