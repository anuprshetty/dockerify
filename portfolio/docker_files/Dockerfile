# Multi-stage builds

# Build stage
FROM node:18-alpine as builder

ARG PROJECT_ROOT_FOLDER=portfolio

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

COPY .. .

RUN npm install

RUN npm run build

# Run stage
FROM nginx:latest

ARG PROJECT_ROOT_FOLDER=portfolio

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

COPY --from=builder /developer/projects/portfolio/build ./build

COPY ../nginx.conf ./nginx.conf

RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx_original.conf
RUN cp nginx.conf /etc/nginx/nginx.conf

# Expose the port on which Nginx will listen
EXPOSE 80

# # Start Nginx daemon service in the background
CMD nginx -g 'daemon off;'
