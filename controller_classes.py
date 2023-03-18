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
    skillId: str
    id: str

class Login_User(BaseModel):
    email: str
    password: str