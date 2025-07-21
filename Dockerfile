# Build Stage
FROM maven:3.9.6 AS build
COPY . .
RUN mvn clean package -DskipTests

# Run Stage
FROM openjdk:17-jdk
COPY --from=build /target/googlekeepclone-0.0.1-SNAPSHOT.jar googlekeepclone.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "googlekeepclone.jar"]
