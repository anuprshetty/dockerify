#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo "Current working directory: $(pwd)"

chmod 755 ./scripts/wait-for-it.sh

./scripts/wait-for-it.sh --host="$BACKEND_HOST" --port=$BACKEND_PORT --strict --timeout=0 -- echo 'backend is ready'
./scripts/wait-for-it.sh --host="$FRONTEND_HOST" --port=$FRONTEND_PORT --strict --timeout=0 -- echo 'frontend is ready'

# Start Nginx daemon service in the foreground
nginx -g 'daemon off;'
