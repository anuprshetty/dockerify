#!/bin/bash

# “set -e” option causes the script to exit immediately if any command exits with a non-zero exit code.
set -e

echo "Current working directory: $(pwd)"

chmod 755 ./scripts/wait-for-it.sh

./scripts/wait-for-it.sh --host=redis-server --port=6379 --strict --timeout=0 -- echo 'redis-server is ready'

npm run start
