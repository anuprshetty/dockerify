# Use an existing docker image as base
FROM alpine:3

ARG PROJECT_ROOT_FOLDER=redis_server

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

# Download and install the dependencies
RUN apk add --update gcc
RUN apk add --update redis

COPY . .

EXPOSE 6379

# Tell the image what to do when it starts as a container
CMD redis-server redis.conf
