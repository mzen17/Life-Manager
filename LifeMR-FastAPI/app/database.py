import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from app.users import Assignment

class Database:
    def __init__(self):
        cred = credentials.Certificate('lifemr-firebase-key.json')
        firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    # Add a user to the database
    async def add_user(self, username: str, password: str):
        doc_ref = self.db.collection(u'users').document(username)
        doc = doc_ref.get()
        if doc.exists:
            return False
        else:
            doc_ref.set({
                u'username': username,
                u'password': password
            })
            return True

    # Assign session token
    async def assignToken(self, username: str, token: str, expire_time: int):
        print("assigning token...")
        doc_ref = self.db.collection(u'users').document(username)
        doc = doc_ref.get()
        doc_ref.update({
            u'sesionToken': token,
            u'expireTime': expire_time
        })

    # Validate a user
    async def validate_user(self, username: str, password: str):
        doc_ref = self.db.collection(u'users').document(username)
        doc = doc_ref.get()
        if doc.exists:
            return doc.to_dict()['password'] == password
        else:
            return False

     # Validate a token session
    async def validate_token(self, username: str, token: str, currTime: int):
        doc_ref = self.db.collection(u'users').document(username)
        doc = doc_ref.get()
        if doc.exists:
            return (doc.to_dict()['sesionToken'] == token and doc.to_dict()['expireTime'] > currTime)
        else:
            return False

    # Return query of users
    async def get_users(self):
        users_ref = self.db.collection(u'users')
        query = users_ref.stream()
        return [doc.to_dict() for doc in query]

    # get assignments for a user
    async def fetch_assignment(self, username :str):
        assignments_ref = self.db.collection(u'users').document(username).collection(u'assignments')
        query = assignments_ref.stream()
        return [doc.to_dict() for doc in query]  

    # push assignments for a user
    async def push_assignment(self, username: str, task: Assignment):
        assignments_ref = self.db.collection(u'users').document(username).collection(u'assignments')
        assignments_ref.add(assignment.to_dict())
