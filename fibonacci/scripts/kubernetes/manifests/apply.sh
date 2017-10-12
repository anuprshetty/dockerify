#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)\n"

echo -e "Applying manifests ... WAIT\n"

kubectl apply -f k8s/fibonacci-namespace.yaml

chmod 755 ./scripts/wait_for_kube_resource.sh
./scripts/wait_for_kube_resource.sh --resource-type namespace --resource fibonacci --namespace fibonacci --resource-query .status.phase --resource-expected-status 'Active'

kube_resource_already_exists() {
    eval '$@ 2>&1 | tee /dev/tty | grep -q "already exists" >/dev/null'
}

kube_command='kubectl create secret --namespace fibonacci generic postgres-server-secret --from-literal=POSTGRES_USER=backend --from-literal=POSTGRES_PASSWORD=postgres --from-literal=POSTGRES_DB=fib'

if kube_resource_already_exists "$kube_command"; then
    echo -e "Ignoring above error ...\n"
fi

kubectl apply -f k8s/ --recursive=true

echo -e "\n\nSUCCESS: manifests applied."
