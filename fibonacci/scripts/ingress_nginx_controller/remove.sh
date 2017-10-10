#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)"
echo -e ""

echo -e "Removing ingress-nginx controller ... WAIT\n"

helm uninstall ingress-nginx --ignore-not-found --wait

echo -e "\n\nSUCCESS: ingress-nginx controller is removed."
