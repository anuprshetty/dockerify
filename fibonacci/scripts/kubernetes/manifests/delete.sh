#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)\n"

echo -e "Deleting manifests ... WAIT\n"

kubectl delete secret --namespace fibonacci postgres-server-secret --ignore-not-found=true

kubectl delete -f k8s/ --recursive=true --ignore-not-found=true --wait=true

echo -e "\n\nSUCCESS: manifests deleted."
