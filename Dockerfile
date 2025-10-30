# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Instalar dependencias necesarias para sqlite3
RUN apk add --no-cache python3 make g++

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production && npm install sqlite3

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto 3200
EXPOSE 3200

# Comando para ejecutar la aplicación
CMD ["npm", "start"]