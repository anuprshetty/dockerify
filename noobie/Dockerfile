FROM node:alpine

ARG PROJECT_ROOT_FOLDER=noobie

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

COPY . .

RUN npm install

EXPOSE 3000

CMD npm start
