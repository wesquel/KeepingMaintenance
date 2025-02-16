# Etapa 1: Construir a aplicação Angular
FROM node:20.15.1 AS builder

WORKDIR /app

COPY . .

ARG BUILD_ENV=production

RUN npm install
RUN if [ "$BUILD_ENV" = "test" ]; then npm run build -- --configuration=test; else npm run build -- --configuration=production; fi

FROM nginx:alpine

COPY --from=builder /app/dist/front_maintenance/browser usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
