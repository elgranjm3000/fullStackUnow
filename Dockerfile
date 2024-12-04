FROM php:8.1-apache

# Actualizar paquetes y preparar el sistema
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        python3-venv \
        curl \
        gnupg \
    && rm -rf /var/lib/apt/lists/*

RUN curl https://getcomposer.org/composer.phar -o /usr/bin/composer && chmod +x /usr/bin/composer
RUN composer self-update    
# Instalar las extensiones PHP necesarias
RUN apt-get update \
    && apt-get install -y git acl openssl openssh-client wget zip vim libssh-dev \
    && apt-get install -y libpng-dev zlib1g-dev libzip-dev libxml2-dev libicu-dev \
    && docker-php-ext-install intl pdo pdo_mysql zip gd soap bcmath sockets mysqli\
    && pecl install xdebug \
    && docker-php-ext-enable --ini-name 05-opcache.ini opcache xdebug \
    && rm -rf /var/lib/apt/lists/*

# Instalar Node.js 18 (si es necesario)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Habilitar módulos necesarios de Apache
RUN a2enmod rewrite

# Instalar unzip para descomprimir phpMyAdmin
RUN apt-get update \
    && apt-get install -y unzip \
    && rm -rf /var/lib/apt/lists/*

# Descargar y configurar phpMyAdmin
RUN curl -LO https://files.phpmyadmin.net/phpMyAdmin/5.2.1/phpMyAdmin-5.2.1-all-languages.zip \
    && unzip phpMyAdmin-5.2.1-all-languages.zip \
    && mv phpMyAdmin-*/ /usr/share/phpmyadmin \
    && rm -f phpMyAdmin-5.2.1-all-languages.zip

# Configurar los permisos para apache
RUN chown -R www-data:www-data /usr/share/phpmyadmin

# Copiar configuraciones adicionales (si es necesario)
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Volver al directorio raíz
WORKDIR /var/www/html

# Exponer el puerto 80
EXPOSE 80
