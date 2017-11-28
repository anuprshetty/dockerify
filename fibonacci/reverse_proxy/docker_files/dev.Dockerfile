FROM nginx:latest

ARG PROJECT_ROOT_FOLDER=reverse_proxy

# set current working directory
WORKDIR /developer/projects/$PROJECT_ROOT_FOLDER
RUN echo "Current working directory: $(pwd)"

COPY . .

RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx_original.conf
RUN cp nginx/dev.nginx.conf /etc/nginx/nginx.conf

# Expose the port on which Nginx will listen
EXPOSE 80

RUN chmod 755 ./scripts/dev.sh

CMD ./scripts/dev.sh
