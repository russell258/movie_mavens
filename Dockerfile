FROM node:18-alpine3.17 AS angbuilder

WORKDIR /app

COPY movie_mavens_client/angular.json .
COPY movie_mavens_client/package.json .
COPY movie_mavens_client/package-lock.json .
COPY movie_mavens_client/tsconfig.app.json .
COPY movie_mavens_client/tsconfig.spec.json .
COPY movie_mavens_client/tsconfig.json .
COPY movie_mavens_client/ngsw-config.json .
COPY movie_mavens_client/src src

RUN npm i -g @angular/cli
RUN npm ci
RUN ng build

FROM maven:3.8.5-openjdk-17 AS javabuilder

WORKDIR /app

COPY movie_maven_backend/src src
COPY movie_maven_backend/mvnw .
COPY movie_maven_backend/pom.xml .

COPY --from=angbuilder /app/dist/movie_mavens_client /app/src/main/resources/static

RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=javabuilder /app/target/movie_maven_backend-0.0.1-SNAPSHOT.jar app.jar

ARG RAILWAY_ENVIRONMENT
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT

EXPOSE ${PORT}

ENTRYPOINT SERVER_PORT=${PORT} java -jar /app/app.jar
