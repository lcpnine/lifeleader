#!/bin/bash

# Navigate to the project directory
cd /home/opc/lifeleader/packages/server

# Pull the latest changes from the main branch
git pull origin main

# Install dependencies
yarn install

# Build the project
yarn build

# Stop the current running application
yarn stop

# Start the application
yarn start

echo "Update and restart completed."
