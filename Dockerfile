FROM maven:3.9.6-eclipse-temurin-22-jammy AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:22-jdk
COPY --from=build /target/googlekeepclone-0.0.1-SNAPSHOT.jar googlekeepclone.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","googlekeepclone.jar"]