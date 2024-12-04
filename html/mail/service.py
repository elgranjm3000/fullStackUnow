# service.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.text import MIMEText
import uvicorn


app = FastAPI()

##COLOCAR LA IP DE TU CONTENEDOR
if __name__ == "__main__":
    uvicorn.run("service:app", host="172.28.0.4", port=8082, reload=True)

class Employee(BaseModel):
    name: str
    email: EmailStr




def send_welcome_email(employee: Employee):
    sender_email = "CONFIGURAR SU SERVICIO EMAIL"
    sender_password = "PASSWORD DE SERVICIO EMAIL"
    smtp_server = "SERVIDOR EMAIL"
    smtp_port = 587

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
