# service.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
import uvicorn
from dotenv import load_dotenv
import os


app = FastAPI()

##COLOCAR LA IP DE TU CONTENEDOR
if __name__ == "__main__":
    load_dotenv()
    ip_email_server = os.getenv('IP_EMAIL_SERVER')
    uvicorn.run("service:app", host=f"{ip_email_server}", port=8082, reload=True)

class Employee(BaseModel):
    name: str
    email: EmailStr




def send_welcome_email(employee: Employee):
    load_dotenv()
    sender_email = os.getenv('sender_email')
    sender_password = os.getenv('sender_password')
    smtp_server = os.getenv('smtp_server')
    smtp_port = os.getenv('smtp_port')
    sender_email = f"{sender_email}"
    sender_password = f"{sender_password}"
    smtp_server = f"{smtp_server}"
    smtp_port = f"{smtp_port}"

    subject = "¡Bienvenido a la compañia!"
    body = f"Hola {employee.name},\n\n¡Bienvenido al equipo! .\n\nUNOW,\nCompany Team"

    msg = MIMEText(body)
    msg["Subject"] = subject
    msg["From"] = sender_email
    msg["To"] = employee.email

    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, employee.email, msg.as_string())
            print(f"Email sent to {employee.email}")
    except Exception as e:
        print(f"Failed to send email: {e}")
        raise HTTPException(status_code=500, detail="Failed to send email")

@app.post("/emailempleado/")
def add_employee(employee: Employee):
    try:
        send_welcome_email(employee)
        return {"message": f"Bienvenido {employee.email}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
