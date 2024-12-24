# db/Dockerfile
FROM postgres:alpine

ENV POSTGRES_DB=mydb
ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=password

COPY init /docker-entrypoint-initdb.d/