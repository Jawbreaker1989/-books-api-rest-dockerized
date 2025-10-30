# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install --production

# Copiar el código fuente de la aplicación
COPY . .

# Exponer el puerto 3200
EXPOSE 3200

# Comando para ejecutar la aplicación
CMD ["npm", "start"]