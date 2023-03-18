# ++++++++++++++++++++++++++
# BASEMODEL EXTENSION CLASS
# ++++++++++++++++++++++++++
from array import array

from pydantic import BaseModel
from typing import List, Any

class Register_User(BaseModel):
    email: str
    firstName: str
    lastName: str
    birthDate: str | None
    password: str


class Get_Courses_Certificates(BaseModel):
    skillId: str
    id: str
    experienceLevel: str


class Login_User(BaseModel):
    email: str
    password: str

class Skill(BaseModel):
    id: int
    skillName: str
class Save_Skills(BaseModel):
    userId: int
    skillList: List[Skill]

