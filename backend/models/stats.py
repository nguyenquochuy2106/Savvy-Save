from pydantic import BaseModel

class Stats(BaseModel):
    user_id: str
    total_income: float
    total_expense: float
    total_savings: float
