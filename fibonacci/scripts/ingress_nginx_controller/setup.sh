#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo -e "Current working directory: $(pwd)"
echo -e ""

helm upgrade --install ingress-nginx ingress-nginx --repo https://kubernetes.github.io/ingress-nginx --namespace ingress-nginx --create-namespace --set controller.service.ports.http=4380 --set controller.service.ports.https=43443

echo -e "\n\nSetting up ingress-nginx controller ... WAIT\n"

kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller

echo -e "\n\nSUCCESS: ingress-nginx controller is ready to use now."
