
# Guía de Instalación y Configuración

Este documento describe cómo configurar y ejecutar el proyecto utilizando Docker, Composer, React y un entorno virtual de Python con servidor de correo y pruebas unitarias.

## Requisitos previos

1. Tener Docker y Docker Compose instalados.

## Pasos para ejecutar el proyecto

### 1. Construir la imagen de Docker

En el directorio raíz del proyecto, ejecutar el siguiente comando para construir la imagen de Docker:

```bash
docker compose --build
```

### 2. Levantar los contenedores

Una vez construida la imagen, puedes levantar los contenedores ejecutando:

```bash
docker compose up -d
```

### 3. Ejecutar los comandos dentro del contenedor

Una vez que los contenedores están corriendo, ingresa al contenedor de `unow-www`:

```bash
docker exec -it unow-www bash
```

### 4. Configuración del Backend (Symfony)

Dentro del contenedor, navega al directorio `backend` y ejecuta los siguientes comandos:

```bash
cd backend
composer install
php bin/console doctrine:fixtures:load
```

### 5. Configuración del Frontend

Ahora navega al directorio `frontend` y ejecuta los siguientes comandos:

```bash
cd frontend
npm install
npm run dev
```

inicia con 

usuario: elgranjm
clave: 123456

### 6. Configuración de Mail (Python)

Navega al directorio `mail` y ejecuta los siguientes comandos para configurar el entorno virtual de Python:

```bash
cd mail
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
python3 service.py #ejecuta servidor de correo
python3 Test.py # Ejemplo de prueba unitaria
```

## Notas adicionales

- Asegúrate de que todos los servicios estén corriendo correctamente con `docker-compose up`.
- Si necesitas detener los contenedores, puedes hacerlo con `docker-compose down`.

- Si deseas saber la ip de tu contenedor ejecuta lo siguiente, es necesario para configurar el servidor de correo

```bash
docker ps

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container_id

```

- Para ingresar a base de dato y lo que se almacenado ingrese al siguiente enlace

[http://localhost:8081](http://localhost:8081)

