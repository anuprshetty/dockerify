#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)\n"

DOCKER_COMPOSE_FILE=""
REGISTRY_SERVER=""
REGISTRY_USERNAME=""
PROJECT_NAME=""

usage() {
    echo "Usage: $0 --docker-compose-file <file_path> --registry-server <registry_server> --registry-username <registry_username> --project-name <project_name>"
    exit 1
}

# Parse command-line named arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
    --docker-compose-file)
        DOCKER_COMPOSE_FILE="$2"
        shift 2
        ;;
    --registry-server)
        REGISTRY_SERVER="$2"
        shift 2
        ;;
    --registry-username)
        REGISTRY_USERNAME="$2"
        shift 2
        ;;
    --project-name)
        PROJECT_NAME="$2"
        shift 2
        ;;
    *)
        usage
        ;;
    esac
done

# Check if any of the required arguments are missing
if [ -z "$DOCKER_COMPOSE_FILE" ] || [ -z "$REGISTRY_SERVER" ] || [ -z "$REGISTRY_USERNAME" ] || [ -z "$PROJECT_NAME" ]; then
    usage
fi

docker compose -f "$DOCKER_COMPOSE_FILE" build

image_and_tag_list=$(docker-compose -f "$DOCKER_COMPOSE_FILE" config --images)

for image_and_tag in $image_and_tag_list; do
    registry_image_and_tag="$REGISTRY_SERVER/$REGISTRY_USERNAME/$PROJECT_NAME-$image_and_tag"

    docker tag "$image_and_tag" "$registry_image_and_tag"

    docker push "$registry_image_and_tag"
done
