#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo "Current working directory: $(pwd)"

chmod 755 ./scripts/wait-for-it.sh

./scripts/wait-for-it.sh --host=backend --port=5000 --strict --timeout=0 -- echo 'backend is ready'

# Start Nginx daemon service in the foreground
nginx -g 'daemon off;'
