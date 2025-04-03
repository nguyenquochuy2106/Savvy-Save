from fastapi import APIRouter
from models.transaction import Transaction
from config.supabase_client import supabase

router = APIRouter()

@router.get("/")
def get_transactions(user_id: str):
    response = supabase.table("Transactions").select("*").eq("user_id", user_id).execute()
    return {"transactions": response["data"]}

@router.post("/")
def add_transaction(transaction: Transaction):
    supabase.table("Transactions").insert(transaction.dict()).execute()
    return {"message": "Transaction added successfully"}
