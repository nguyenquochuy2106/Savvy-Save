from pydantic import BaseModel

class User(BaseModel):
    id: str
    username: str
    email: str
    password: str
    profile_image_url: str
