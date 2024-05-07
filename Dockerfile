# Usamos la imagen oficial de Node.js como base
FROM node:latest AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el archivo package.json al directorio de trabajo
COPY frontend/package.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos del proyecto
COPY frontend .

# Compilamos la aplicación Angular para producción
RUN npm run build -- --output-path=./dist/out

# Creamos una nueva etapa en la construcción
FROM nginx:alpine

# Copiamos los archivos compilados de la etapa anterior al directorio de trabajo del servidor web de Nginx
COPY --from=builder /app/dist/out /usr/share/nginx/html

# Exponemos el puerto 80 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 80

# Comando de arranque del servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
