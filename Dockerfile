FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILE=prod

CMD ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
