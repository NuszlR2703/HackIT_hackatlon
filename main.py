import time
from fastapi import FastAPI, Response, status, HTTPException, Request, File, UploadFile, Form
import json
import mysql.connector
from fastapi.middleware.cors import CORSMiddleware

import database_connection as db_connect
import uvicorn
import controller_classes
import openai_function as openai

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.post("/register-user", status_code=status.HTTP_201_CREATED)
async def register_user(user: controller_classes.Register_User):
    user_email = str(user.email)

    cursor.execute("""SELECT * FROM user_profile WHERE user_email = %s""", ([user_email]))
    num_rows = cursor.rowcount
    if num_rows != 0:
        raise HTTPException(status_code=status.HTTP_306_RESERVED, detail="The email address is already in use!")

    first_name = str(user.firstName)
    last_name = str(user.lastName)
    birth_date = str(user.birthDate)
    password = str(user.password)

    sql_body = """INSERT INTO user_profile ( user_email, first_name, last_name, birth_date, password) VALUES \
    (%s, %s, %s, %s, %s)"""
    sql_params = (user_email, first_name, last_name, birth_date, password)
    cursor.execute(sql_body, sql_params)
    connect_DB.commit()

    return {"status_code": "201", "detail": "User profile created!"}


@app.post("/login-user")
async def login_user(user: controller_classes.Login_User):
    email = str(user.email)
    password = str(user.password)
    cursor.execute("""SELECT * FROM user_profile WHERE user_email = %s and password = %s """,
                   ([email, password]))
    num_rows = cursor.rowcount
    if num_rows == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="404")

    user_data = cursor.fetchall()
    user_id = int(user_data[0]['user_id'])
    email = str(user_data[0]['user_email'])
    first_name = str(user_data[0]['first_name'])
    last_name = str(user_data[0]['last_name'])
    birth_date = str(user_data[0]['birth_date'])

    user_data_to_send = {'id': user_id, 'email': email, 'firstName': first_name, 'lastName': last_name,
                         'birthDate': birth_date}
    return {"detail": "200", "user_data": user_data_to_send}


@app.post("/get-courses", status_code=status.HTTP_200_OK)
async def get_courses(user: controller_classes.Get_Courses_Certificates):
    user_id = int(user.userId)
    skill_id = int(user.id)
    experience_level = int(user.experienceLevel)

    cursor.execute("""SELECT c.course_link, sk.skill_name FROM course_list c join skills sk 
        on sk.skill_id = c.fk_skill_id WHERE c.fk_skill_id = %s AND c.fk_user_id = %s""", ([skill_id, user_id]))
    response_list = cursor.fetchall()
    result_list = []
    if len(response_list) != 0:
        for i in response_list:
            result_list.append(i['course_link'])
    else:
        cursor.execute("""SELECT skill_name FROM skills WHERE skill_id = %s""", ([skill_id]))
        response_list = cursor.fetchall()

    experience_level_temp = "Beginner"
    match experience_level:
        case 0:
            experience_level_temp = "Beginner"
        case 1:
            experience_level_temp = "Intermediate"
        case 2:
            experience_level_temp = "Expert"

    result = openai.get_courses(response_list[0]['skill_name'], result_list, experience_level_temp)

    result_final = []
    for i in result:
        sql_body = """INSERT INTO course_list ( course_name, fk_user_id, fk_skill_id, course_link, experience_level) 
                    VALUES (%s, %s, %s, %s, %s)"""
        sql_params = (i[0], user_id, skill_id, i[1], experience_level)
        cursor.execute(sql_body, sql_params)
        connect_DB.commit()

    cursor.execute(
        """SELECT * FROM course_list WHERE fk_user_id = %s AND fk_skill_id = %s ORDER BY experience_level ASC""",
        ([user_id, skill_id]))
    response_list = cursor.fetchall()
    for i in response_list:
        result_item = {
            "courseName": i['course_name'],
            "courseLink": i['course_link'],
            "experienceLevel": i['experience_level']
        }
        result_final.append(result_item)

    return {"status_code": "201", "detail": result_final}


@app.post("/get-certificates", status_code=status.HTTP_200_OK)
async def get_certificates(user: controller_classes.Get_Courses_Certificates):
    user_id = int(user.userId)
    skill_id = int(user.id)
    experience_level = str(user.experienceLevel)

    cursor.execute("""SELECT cl.certificate_link, sk.skill_name FROM certificates_list cl join skills sk 
    on sk.skill_id = cl.fk_skill_id WHERE cl.fk_skill_id = %s AND cl.fk_user_id = %s""", ([skill_id, user_id]))
    response_list = cursor.fetchall()
    result_list = []
    if len(response_list) != 0:
        for i in response_list:
            result_list.append(i['certificate_link'])
    else:
        cursor.execute("""SELECT skill_name FROM skills WHERE skill_id = %s""", ([skill_id]))
        response_list = cursor.fetchall()

    experience_level_temp = "Beginner"
    match experience_level:
        case 0:
            experience_level_temp = "Beginner"
        case 1:
            experience_level_temp = "Intermediate"
        case 2:
            experience_level_temp = "Expert"

    result = openai.get_certificates(response_list[0]['skill_name'], result_list, experience_level_temp)

    result_final = []
    for i in result:
        sql_body = """INSERT INTO certificates_list ( certificate_name, fk_user_id, fk_skill_id, certificate_link, 
        experience_level) 
                    VALUES (%s, %s, %s, %s, %s)"""
        sql_params = (i[0], user_id, skill_id, i[1], experience_level)
        cursor.execute(sql_body, sql_params)
        connect_DB.commit()

    cursor.execute(
        """SELECT * FROM certificates_list WHERE fk_user_id = %s AND fk_skill_id = %s ORDER BY experience_level ASC""",
        ([user_id, skill_id]))
    response_list = cursor.fetchall()

    for i in response_list:
        result_item = {
            "certificateName": i['certificate_name'],
            "certificateLink": i['certificate_link'],
            "experienceLevel": i['experience_level']
        }
        result_final.append(result_item)

    return {"status_code": "201", "detail": result_final}


@app.post("/get-skills", status_code=status.HTTP_200_OK)
async def get_skills():
    cursor.execute("""SELECT * FROM skills""")
    response_list = cursor.fetchall()
    response = []
    for i in range(0, len(response_list)):
        item = {"id": int(response_list[i]['skill_id']), "skillName": str(response_list[i]['skill_name'])}
        response.append(item)
    return response


@app.post("/save-skills", status_code=status.HTTP_200_OK)
async def save_skills(user: controller_classes.Save_Skills):
    user_id = str(user.userId)
    skill_list = list(user.skillList)
    cursor.execute("""DELETE FROM user_skill_list WHERE fk_user_id = %s""",
                   ([user_id]))
    connect_DB.commit()

    if len(skill_list) != 0:
        for i in skill_list:
            sql_body = """INSERT INTO user_skill_list ( fk_user_id, fk_skill_id) VALUES (%s, %s)"""
            sql_params = (user_id, i.id)
            cursor.execute(sql_body, sql_params)
            connect_DB.commit()

    return {"status_code": "201", "detail": "Skills added to the profile!"}


@app.post("/get-user-skills")
async def get_user_skills(user: controller_classes.Get_User_Skills):
    user_id = str(user.userId)

    cursor.execute(
        """SELECT sk.skill_name, usl.fk_skill_id FROM user_skill_list usl join skills sk on  sk.skill_id = 
        usl.fk_skill_id  WHERE usl.fk_user_id = %s""",
        ([user_id]))
    num_rows = cursor.rowcount
    skill_item_list = []
    if num_rows != 0:
        user_data = cursor.fetchall()
        skill_item_list = []
        response = {"detail": "200", "skillList": skill_item_list}

        for i in range(0, len(user_data)):
            skill_item = {"id": int(user_data[i]['fk_skill_id']),
                          "skillName": str(user_data[i]['skill_name'])
                          }
            skill_item_list.append(skill_item)
    else:
        response = {"detail": "200", "skillList": skill_item_list}

    return response


@app.post("/get-all-assessments")
async def get_all_assessments(user: controller_classes.Get_User_Skills):
    user_id = str(user.userId)

    cursor.execute("""SELECT * FROM user_skill_list WHERE fk_user_id = %s""", ([user_id]))
    num_rows = cursor.rowcount
    skill_item_list = []

    if num_rows != 0:
        skill_ids = cursor.fetchall()
        for skill_item in skill_ids:
            fk_skill_id = skill_item['fk_skill_id']
            cursor.execute("""SELECT skill_name FROM skills WHERE skill_id = %s""",
                           ([fk_skill_id]))
            skill_item_name = cursor.fetchall()
            skill_item_name = skill_item_name[0]['skill_name']

            cursor.execute("""SELECT * FROM course_list WHERE fk_user_id = %s and fk_skill_id = %s ORDER BY 
            experience_level""", ([user_id, fk_skill_id]))
            num_rows = cursor.rowcount
            course_list = []
            if num_rows != 0:
                course_item_list = cursor.fetchall()
                for course_item in course_item_list:
                    course_item_to_list = {
                        "id": course_item['id'],
                        "courseName": course_item['course_name'],
                        "userId": course_item['fk_user_id'],
                        "skillId": course_item['fk_skill_id'],
                        "courseFile": course_item['course_file'],
                        "courseLink": course_item['course_link'],
                        "experienceLevel": course_item['experience_level']
                    }
                    course_list.append(course_item_to_list)

            cursor.execute("""SELECT * FROM certificates_list WHERE fk_user_id = %s and fk_skill_id = %s 
            ORDER BY experience_level""",
                           ([user_id, fk_skill_id]))
            num_rows = cursor.rowcount
            certificate_list = []
            if num_rows != 0:
                certificate_item_list = cursor.fetchall()
                for certificate_item in certificate_item_list:
                    certificate_item_to_list = {
                        "id": certificate_item['id'],
                        "certificateName": certificate_item['certificate_name'],
                        "userId": certificate_item['fk_user_id'],
                        "skillId": certificate_item['fk_skill_id'],
                        "certificateFile": certificate_item['certificate_file'],
                        "certificateLink": certificate_item['certificate_link'],
                        "experienceLevel": certificate_item['experience_level']
                    }
                    certificate_list.append(certificate_item_to_list)

            skill_final_item = {
                "id": fk_skill_id,
                "skillName": skill_item_name,
                "courseList": course_list,
                "certificateList": certificate_list
            }
            skill_item_list.append(skill_final_item)
    response = {"detail": "200", "skillList": skill_item_list}
    return response


@app.post("/delete-assessment")
async def delete_assessment(user: controller_classes.Assessment):
    user_id = str(user.userId)
    assessment_id = str(user.id)

    cursor.execute(
        """DELETE FROM certificates_list WHERE fk_user_id = %s and id = %s""",
        ([user_id, assessment_id]))
    cursor.execute(
        """DELETE FROM course_list WHERE fk_user_id = %s and id = %s""",
        ([user_id, assessment_id]))
    connect_DB.commit()

    response = {"detail": "200"}

    return response


@app.post("/mark-as-done")
async def mark_as_done(user: controller_classes.Assessment):
    user_id = str(user.userId)
    assessment_id = str(user.id)

    cursor.execute("""UPDATE certificates_list SET certificate_file = 1 WHERE fk_user_id = %s and id = %s""",
                   ([user_id, assessment_id]))
    cursor.execute("""UPDATE course_list SET course_file = 1 WHERE fk_user_id = %s and id = %s""",
                   ([user_id, assessment_id]))

    connect_DB.commit()

    response = {"detail": "200"}

    return response


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
