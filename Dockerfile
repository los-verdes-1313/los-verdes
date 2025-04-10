# Etapa de construcción
FROM node:20-alpine as build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Crear directorio para certificados SSL
RUN mkdir -p /etc/nginx/ssl

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de la aplicación construida
COPY --from=build /app/dist/landing-page/browser /usr/share/nginx/html

# Exponer los puertos 80 y 443
EXPOSE 80
EXPOSE 443

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]