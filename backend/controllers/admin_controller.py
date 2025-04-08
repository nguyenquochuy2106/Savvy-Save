from fastapi import APIRouter, HTTPException, Depends
from backend.config.supabase_client import supabase
from backend.main import verify_token

router = APIRouter()

@router.get("/users")
def get_all_users(token: str = Depends(verify_token)):
    # Verify if the user is an admin
    user_data = supabase.auth.get_user(token)
    if not user_data or user_data.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access denied")

    response = supabase.table("Users").select("*").execute()
    return {"users": response["data"]}

@router.put("/users/{user_id}")
def update_user(user_id: str, user_data: dict, token: str = Depends(verify_token)):
    # Verify if the user is an admin
    admin_data = supabase.auth.get_user(token)
    if not admin_data or admin_data.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Access denied")

    supabase.table("Users").update(user_data).eq("id", user_id).execute()
    return {"message": "User updated successfully"}
