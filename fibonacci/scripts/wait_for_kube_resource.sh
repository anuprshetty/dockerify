#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)\n"

resource_type=""
resource_name=""
namespace_name=""
resource_query=""
resource_expected_status=""

usage() {
    echo "Usage: $0 --resource-type <resource_type> --resource <resource_name> --namespace <namespace_name> --resource-query <.resource.query> --resource-expected-status <resource_expected_status>"
    exit 1
}

# Parse command-line named arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
    --resource-type)
        resource_type="$2"
        shift 2
        ;;
    --resource)
        resource_name="$2"
        shift 2
        ;;
    --namespace)
        namespace_name="$2"
        shift 2
        ;;
    --resource-query)
        resource_query="$2"
        shift 2
        ;;
    --resource-expected-status)
        resource_expected_status="$2"
        shift 2
        ;;
    *)
        usage
        ;;
    esac
done

# Check if any of the required arguments are missing
if [ -z "$resource_type" ] || [ -z "$resource_name" ] || [ -z "$namespace_name" ] || [ -z "$resource_query" ] || [ -z "$resource_expected_status" ]; then
    usage
fi

kube_resource_exists() {
    kubectl get $resource_type $resource_name --namespace $namespace_name --output json | jq $resource_query --raw-output | grep -q "^$resource_expected_status$" >/dev/null
}

while ! kube_resource_exists; do
    echo -e "$resource_type/$resource_name is not ready yet. Retrying in 5 seconds..."
    sleep 5
    echo -e ""
done

echo -e "\nSUCCESS: $resource_type/$resource_name is ready now in the namespace $namespace_name"
