from fastapi import APIRouter
from config.supabase_client import supabase

router = APIRouter()

@router.get("/")
def get_stats(user_id: str):
    response = supabase.table("Stats").select("*").eq("user_id", user_id).execute()
    if not response["data"]:
        return {"stats": {"total_income": 0, "total_expense": 0, "total_savings": 0}}
    return {"stats": response["data"][0]}
