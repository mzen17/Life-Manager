from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    username = Column(String, primary_key=True)
    password = Column(String)
    session_token = Column(String)
    expire_time = Column(Integer)

class Assignment(Base):
    __tablename__ = 'assignments'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    duedate = Column(String)
    quicklink = Column(String)
    user_username = Column(String, ForeignKey('users.username'))
    user = relationship('User', backref='assignments')

class Database:
    # Create a database
    def __init__(self):
        self.engine = create_engine('postgresql://lifemr:pass@postgres/pass')
        self.Session = sessionmaker(bind=self.engine)
        Base.metadata.create_all(bind=self.engine)

    # Add a user to the database
    async def add_user(self, username: str, password: str):
        session = self.Session()
        if session.query(User).filter_by(username=username).first():
            return False
        else:
            user = User(username=username, password=password)
            session.add(user)
            session.commit()
            return True

    # Assign session token
    async def assignToken(self, username: str, token: str, expire_time: int):
        session = self.Session()
        user = session.query(User).filter_by(username=username).first()
        user.session_token = token
        user.expire_time = expire_time
        session.commit()

    # Validate a user
    async def validate_user(self, username: str, password: str):
        session = self.Session()
        user = session.query(User).filter_by(username=username).first()
        if user:
            return user.password == password
        else:
            return False

    # Validate a token session
    async def validate_token(self, username: str, token: str, currTime: int):
        session = self.Session()
        user = session.query(User).filter_by(username=username).first()
        if user:
            return (user.session_token == token and user.expire_time > currTime)
        else:
            return False

    # Return query of users
    async def get_users(self):
        session = self.Session()
        users = session.query(User).all()
        return [user.__dict__ for user in users]

    # get assignments for a user
    async def fetch_assignment(self, username :str):
        session = self.Session()
        user = session.query(User).filter_by(username=username).first()
        if user:
            assignments = user.assignments
            return [assignment.__dict__ for assignment in assignments]
        else:
            return []

    # push assignments for a user
    async def push_assignment(self, username: str, task: Assignment):
        session = self.Session()
        user = session.query(User).filter_by(username=username).first()
        if user:
            print("name: " + task.name + " ; quicklink: " + task.quicklink + "; due date: " + task.duedate)
            assignment = Assignment(name=task.name, quicklink=task.quicklink, duedate=task.duedate)
            user.assignments.append(assignment)
            session.commit()
