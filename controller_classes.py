# ++++++++++++++++++++++++++
# BASEMODEL EXTENSION CLASS
# ++++++++++++++++++++++++++
from pydantic import BaseModel


class Register_User(BaseModel):
    userEmail: str
    firstName: str
    lastName: str
    birthDate: str
    password: str


class Get_Courses_Certificates(BaseModel):
    skill_name: str
