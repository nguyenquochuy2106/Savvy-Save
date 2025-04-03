from pydantic import BaseModel
from datetime import date

class Transaction(BaseModel):
    id: str
    user_id: str
    date: date
    category: str
    transaction_type: str
    amount: float
    note: str
