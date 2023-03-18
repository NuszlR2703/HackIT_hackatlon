import time
from fastapi import FastAPI, Response, status, HTTPException, Request, File, UploadFile, Form
import json
import mysql.connector
import database_connection as db_connect
import uvicorn

# Start server: uvicorn main:app
app = FastAPI()

while True:
    try:
        connect_DB = mysql.connector.connect(host=db_connect.db_host, user=db_connect.db_user, passwd=db_connect.db_password, database=db_connect.db_name)
        cursor = connect_DB.cursor(dictionary=True, buffered=True)
        break
    except Exception as error:
        print("Connecting to database failed")
        print("Error: ", error)
        time.sleep(5)

# ++++++++++++++++++++++++
# API
# ++++++++++++++++++++++++
# login_user
@app.get("/test-api-call")
async def login_user():
    return {"detail": "200", "message": "Test API"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)