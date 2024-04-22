# Etapa 1: Compilación con Node.js 20
FROM node:20 AS build
# Establece el directorio de trabajo
WORKDIR /app
# Copia los archivos de configuración de npm
COPY ./ /app
# Instala las dependencias
RUN npm install
# Compila la aplicación
RUN npm run build

# Etapa 2: Servir con Nginx
FROM nginx:alpine
# Copia la aplicación compilada desde la etapa anterior
COPY --from=build /app/dist/* /usr/share/nginx/html/
# Opcionalmente, copia un archivo de configuración Nginx personalizado
COPY nginx.conf /etc/nginx/nginx.conf
