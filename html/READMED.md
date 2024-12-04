
# Proyecto Backend-Frontend con Symfony, Node.js y Python

Este proyecto incluye un **backend** desarrollado con **Symfony**, un **frontend** con **Node.js** y un servicio de correo en **Python**. Sigue estos pasos para instalar y configurar correctamente el entorno de desarrollo.

## Requisitos Previos

Antes de empezar, asegúrate de tener instaladas las siguientes versiones de los siguientes lenguajes y herramientas:

- **Node.js** versión 18
- **PHP** versión 8.1
- **Python** versión 3.x
- **Composer** (para gestionar las dependencias de Symfony)

Puedes verificar las versiones instaladas con los siguientes comandos:

```bash
node -v
php -v
python --version
composer --version
```

## Instalación

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local.

### 1. Configuración del Backend (Symfony)

1. Dirígete a la carpeta **backend**:

   ```bash
   cd backend
   ```

2. Instala las dependencias de PHP utilizando **Composer**:

   ```bash
   composer install
   ```

3. Crea la base de datos (este comando creará la base de datos si no existe):

   ```bash
   php bin/console doctrine:database:create
   ```

4. Genera las migraciones necesarias para la base de datos:

   ```bash
   php bin/console make:migration
   ```

5. Aplica las migraciones a la base de datos:

   ```bash
   php bin/console doctrine:migrations:migrate
   ```

### 2. Configuración del Frontend (Node.js)

1. Dirígete a la carpeta **frontend**:

   ```bash
   cd ../frontend
   ```

2. Instala las dependencias de Node.js utilizando **npm**:

   ```bash
   npm install
   ```

### 3. Configuración del Servicio de Correo (Python)

1. Dirígete a la carpeta **mail**:

   ```bash
   cd ../mail
   ```

2. Ejecuta el servicio de correo con Python:

   ```bash
   python services.py
   ```

Esto iniciará el servicio de correo. Asegúrate de que los detalles de configuración del servicio estén correctamente establecidos en el archivo `services.py`.

## Ejecución del Proyecto

Después de haber seguido los pasos anteriores, ya puedes ejecutar el **backend** y el **frontend** para probar el proyecto.

- Para el backend de **Symfony**, ejecuta el servidor integrado con el siguiente comando:

   ```bash
   symfony server:start
   ```

- Para el **frontend** con **Node.js**, ejecuta el siguiente comando:

   ```bash
   npm run dev
   ```

Esto debería poner en marcha tanto el servidor del **backend** como el del **frontend**, y podrás acceder a la aplicación en tu navegador.

## Notas

- Asegúrate de tener configurado correctamente tu entorno de base de datos en el archivo `.env` de Symfony.
- Si tienes algún problema con las dependencias de **Node.js** o **PHP**, intenta ejecutar `npm install` o `composer install` nuevamente.
- El servicio de correo en Python (`services.py`) debe estar ejecutándose para poder enviar correos. Asegúrate de que todos los parámetros de configuración estén bien definidos (por ejemplo, servidor SMTP, credenciales de correo).
