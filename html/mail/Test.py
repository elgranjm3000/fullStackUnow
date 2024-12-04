import unittest
import requests
import json
from dotenv import load_dotenv
import os
class TestEmpleadoAPI(unittest.TestCase):
    
    load_dotenv()
    ip_email_server = os.getenv('IP_EMAIL_SERVER')

    BASE_URL = f"http://{ip_email_server}/backend/public/index.php/api/empleado"
    LOGIN_URL = f"http://{ip_email_server}/backend/public/index.php/login"  

    def setUp(self):
        self.credentials = {
            'username': 'elgranjm',  
            'password': '123456'  
        }
        self.token = self.get_token()

    def get_token(self):
        
        response = requests.post(self.LOGIN_URL, json=self.credentials)
        
        
        if response.status_code == 200:        
            response_data = response.json()            
            return response_data.get('token')
        else:
            raise Exception("Autenticación fallida")

    def test_register_empleado(self):
        
        data = {
            'nombre': 'Juan',
            'apellido': 'Pérez',
            'puesto': 'Desarrollador',
            'email': 'juan@example.com',
            'fechaNacimiento': '1990-01-01'
        }

        
        headers = {
            'Authorization': f'Bearer {self.token}'
        }
        
        
        response = requests.post(self.BASE_URL, json=data, headers=headers)

 

        
if __name__ == '__main__':
    unittest.main()
