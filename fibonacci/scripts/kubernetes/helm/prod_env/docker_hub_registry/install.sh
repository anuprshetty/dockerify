#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)\n"

echo -e "Installing helm chart ... WAIT\n"

kube_resource_already_exists() {
    eval '$@ 2>&1 | tee /dev/tty | grep -q "already exists" >/dev/null'
}

kube_command='kubectl create namespace fibonacci-prod'

if kube_resource_already_exists "$kube_command"; then
    echo -e "Ignoring above error ...\n"
fi

chmod 755 ./scripts/wait_for_kube_resource.sh
./scripts/wait_for_kube_resource.sh --resource-type namespace --resource fibonacci-prod --namespace fibonacci-prod --resource-query .status.phase --resource-expected-status 'Active'

kube_command='kubectl create secret --namespace fibonacci-prod generic postgres-server-secret --from-literal=POSTGRES_USER=backend --from-literal=POSTGRES_PASSWORD=postgres --from-literal=POSTGRES_DB=fib'

if kube_resource_already_exists "$kube_command"; then
    echo -e "Ignoring above error ...\n"
fi

helm upgrade --install fibonacci-prod helm/fibonacci/ --namespace fibonacci-prod --values=helm/fibonacci/values.yaml --values=helm/fibonacci/values-prod-env.yaml --values=helm/fibonacci/values-docker-hub-registry.yaml --wait --wait-for-jobs

echo -e "\n\nSUCCESS: helm chart installed."
