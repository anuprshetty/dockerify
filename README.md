# Dockerify

It's working on everyone's machine :)

## Projects

- noobie --> node.js, docker, docker compose
- web_visits --> node.js, redis, docker, docker compose
- portfolio --> react.js, docker, docker compose
- fibonacci --> react.js, node.js, redis, postgres, nginx, docker, docker compose, kubernetes, helm chart, devspace

## Learnings from these projects

- Docker
- Docker Compose
- Kubernetes
- Helm Chart
- DevSpace - Build, test and debug applications directly inside Kubernetes

## Notes

- Container-based application design encourages certain principles. One of these principles is that there should just be one process running in a container. That is to say, a Docker container should have just one program running inside it.
- docker exec vs docker attach:
  - docker exec command executes commands in a new process in the container.  
    command: docker exec -it <container_id> <exec_command>
  - docker attach command attaches the standard IO streams of our terminal to the primary process of the running container.  
    command: docker attach <container_id>
- containers in pods share the same unix/linux namespaces (localhost).
