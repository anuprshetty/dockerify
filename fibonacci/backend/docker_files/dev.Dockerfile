FROM node:18-alpine

ARG PROJECT_ROOT_FOLDER=backend

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

RUN apk update && apk add bash

COPY . .

RUN npm install

EXPOSE 5000

RUN chmod 755 ./scripts/dev.sh

CMD ./scripts/dev.sh
