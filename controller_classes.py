from array import array
from pydantic import BaseModel
from typing import List


class Register_User(BaseModel):
    email: str
    firstName: str
    lastName: str
    birthDate: str | None
    password: str


class Get_Courses_Certificates(BaseModel):
    skillId: int
    userId: int
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


class Get_User_Skills(BaseModel):
    userId: int
