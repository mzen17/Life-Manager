class User(BaseModel):
    username: str
    password: str
    session_token: str
    assignments: List[Assignment]
