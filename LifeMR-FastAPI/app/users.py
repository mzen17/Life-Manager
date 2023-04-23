from pydantic import BaseModel

class Assignment(BaseModel):
    name: str
    duedate: int
    description: str
    quicklink: str
    weight: int

class Class(BaseModel):
    name: str
    description: str
    target_grade: str
    curr_grade: str

class User(BaseModel):
    username: str
    email: str
    password: str
    session_token: str
    assignments: List[Assignment]
    classes: List[Class]
# Load Assignment