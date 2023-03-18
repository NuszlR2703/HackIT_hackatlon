import time
from fastapi import FastAPI, Response, status, HTTPException, Request, File, UploadFile, Form
import json
import mysql.connector
import database_connection as db_connect
import uvicorn
import controller_classes
import openai_function as openai

# Start server: uvicorn main:app
app = FastAPI()

while True:
    try:
        connect_DB = mysql.connector.connect(host=db_connect.db_host, user=db_connect.db_user,
                                             passwd=db_connect.db_password, database=db_connect.db_name)
        cursor = connect_DB.cursor(dictionary=True, buffered=True)
        break
    except Exception as error:
        print("Connecting to database failed")
        print("Error: ", error)
        time.sleep(5)


# ++++++++++++++++++++++++
# API
# ++++++++++++++++++++++++
# register_user
@app.post("/register-user", status_code=status.HTTP_201_CREATED)
async def register_user(user: controller_classes.Register_User):
    user_email = str(user.user_email)

    cursor.execute("""SELECT * FROM user_profile WHERE user_email = %s""", ([user_email]))
    num_rows = cursor.rowcount
    if num_rows != 0:
        raise HTTPException(status_code=status.HTTP_306_RESERVED, detail="The email address is already in use!")

    first_name = str(user.first_name)
    last_name = str(user.first_name)
    birth_date = str(user.birth_date)
    password = str(user.password)

    sql_body = """INSERT INTO user_profile ( user_email, first_name, last_name, birth_date, password) VALUES \
    (%s, %s, %s, %s, %s)"""
    sql_params = (user_email, first_name, last_name, birth_date, password)
    cursor.execute(sql_body, sql_params)
    connect_DB.commit()

    return {"status_code": "201", "detail": "User profile created!"}


@app.get("/get-courses", status_code=status.HTTP_200_OK)
async def get_courses(user: controller_classes.Get_Courses_Certificates):
    skill_name = str(user.skill_name)
    print(skill_name)
    result = openai.get_courses(skill_name)

    return {"status_code": "201", "detail": result}


@app.get("/get-certificates", status_code=status.HTTP_200_OK)
async def get_certificates(user: controller_classes.Get_Courses_Certificates):
    skill_name = str(user.skill_name)
    print(skill_name)
    result = openai.get_certificates(skill_name)

    return {"status_code": "201", "detail": result}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
