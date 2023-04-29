from pydantic import BaseModel

class Assignment(BaseModel):
    name: str
    duedate: str
    quicklink: str

    def to_dict(self):
        return {
            'name': self.name,
            'duedate': self.duedate,
            'quicklink': self.quicklink
        }

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
    assignments: list[Assignment]
    tokens: list[int]


class LoginUser(BaseModel):
    username: str
    password: str

# Load Assignment