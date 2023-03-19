# ++++++++++++++++++++++++++
# BASEMODEL EXTENSION CLASS
# ++++++++++++++++++++++++++
from pydantic import BaseModel


class Register_User(BaseModel):
    user_email: str
    first_name: str
    last_name: str
    birth_date: str
    password: str


class Get_Courses_Certificates(BaseModel):
    skill_name: str
