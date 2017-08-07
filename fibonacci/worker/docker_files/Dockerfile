FROM node:18-alpine

ARG PROJECT_ROOT_FOLDER=worker

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

RUN apk update && apk add bash

COPY .. .

RUN npm install

EXPOSE 3000

RUN chmod 755 ./scripts/prod.sh

CMD ./scripts/prod.sh
