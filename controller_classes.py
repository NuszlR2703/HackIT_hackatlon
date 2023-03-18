# ++++++++++++++++++++++++++
# BASEMODEL EXTENSION CLASS
# ++++++++++++++++++++++++++
from pydantic import BaseModel


class Register_User(BaseModel):
    email: str
    firstName: str
    lastName: str
    birthDate: str | None
    password: str


class Get_Courses_Certificates(BaseModel):
    skill_name: str

class Login_User(BaseModel):
    email: str
    password: str