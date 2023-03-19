from pydantic import BaseModel
from typing import List


class Register_User(BaseModel):
    email: str
    firstName: str
    lastName: str
    birthDate: str | None
    password: str


class Get_Courses_Certificates(BaseModel):
    id: int
    userId: int
    experienceLevel: int


class Login_User(BaseModel):
    email: str
    password: str


class Skill(BaseModel):
    id: int
    skillName: str


class Save_Skills(BaseModel):
    userId: int
    skillList: List[Skill]


class Get_All_Assessments(BaseModel):
    userId: int


class Assessment(BaseModel):
    userId: int
    id: int


class Get_User_Skills(BaseModel):
    userId: int
