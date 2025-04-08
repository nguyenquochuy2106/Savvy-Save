from fastapi import APIRouter, HTTPException
from backend.models.user import User
from backend.config.supabase_client import supabase

router = APIRouter()

@router.post("/register")
def register(user: User):
    try:
        response = supabase.auth.sign_up({
            "email": user.email,
            "password": user.password,
        })
        if "error" in response and response["error"]:
            raise HTTPException(status_code=400, detail=response["error"]["message"])
        
        supabase.table("Users").insert({
            "id": response["user"]["id"],
            "username": user.username,
            "email": user.email,
        }).execute()
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/login")
def login(email: str, password: str):
    response = supabase.auth.sign_in_with_password({
        "email": email,
        "password": password,
    })
    if "error" in response:
        raise HTTPException(status_code=400, detail=response["error"]["message"])
    return {
        "message": "Login successful",
        "user": {
            "id": response["user"]["id"],
            "email": response["user"]["email"],
            "access_token": response["user"]["access_token"],
        },
    }
