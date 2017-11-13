#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)\n"

echo -e "Uninstalling helm chart ... WAIT\n"

kubectl delete secret --namespace fibonacci-dev postgres-server-secret --ignore-not-found=true

kubectl delete secret --namespace fibonacci-dev docker-local-registry-secret --ignore-not-found=true

helm uninstall fibonacci-dev --namespace fibonacci-dev --ignore-not-found --wait

kubectl delete namespace fibonacci-dev --ignore-not-found=true --wait=true

echo -e "\n\nSUCCESS: helm chart uninstalled."
