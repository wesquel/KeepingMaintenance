# Etapa 1: Construir a aplicação Angular
FROM node:20.15.1 AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
FROM nginx:alpine

COPY --from=builder /app/dist/front_maintenance/browser usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
