FROM gradle:jdk11 as builder

ENV APP_HOME=/apps

WORKDIR $APP_HOME

COPY build.gradle settings.gradle $APP_HOME/

COPY src $APP_HOME/src

RUN gradle clean build

FROM openjdk:11-jdk

ENV APP_HOME=/apps
#ARG ARTIFACT_NAME=app.jar
ARG JAR_FILE_PATH=build/libs/biscuIT-0.0.1-SNAPSHOT.jar

WORKDIR $APP_HOME
COPY --from=builder $APP_HOME/$JAR_FILE_PATH app.jar

EXPOSE 8080

#ARG JAR_FILE=~/S08P22A706/backend/service API/build/libs/biscuIT-0.0.1-SNAPSHOT.jar

#COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
