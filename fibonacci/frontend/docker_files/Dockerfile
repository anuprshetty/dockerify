# Multi-stage builds

# Build stage
FROM node:18-alpine as builder

ARG PROJECT_ROOT_FOLDER=frontend

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

COPY . .

RUN npm install

RUN npm run build

# Run stage
FROM nginx:latest

ARG PROJECT_ROOT_FOLDER=frontend

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

COPY --from=builder /developer/projects/frontend/build/ ./build/
COPY --from=builder /developer/projects/frontend/scripts/ ./scripts/

COPY ./nginx.conf ./nginx.conf

RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx_original.conf
RUN cp nginx.conf /etc/nginx/nginx.conf

# Expose the port on which Nginx will listen
EXPOSE 3000

RUN chmod 755 ./scripts/prod.sh

CMD ./scripts/prod.sh
