#!/bin/bash

# Path to the certbot command
CERTBOT_CMD=$(which certbot)

# Path to the live LetsEncrypt directory (change if different)
LE_LIVE_PATH="/etc/letsencrypt/live/api.lifeleader.me"

# Destination directory for the keys
KEYS_DIR="/home/opc/keys"

# Function to reload Nginx
reload_nginx() {
    echo "Reloading Nginx..."
    systemctl reload nginx
}

# Function to copy keys
copy_keys() {
    echo "Copying keys to $KEYS_DIR..."
    cp $LE_LIVE_PATH/fullchain.pem $KEYS_DIR
    cp $LE_LIVE_PATH/privkey.pem $KEYS_DIR
}

# Check if Certbot is installed
if [ -z "$CERTBOT_CMD" ]; then
    echo "Certbot not found. Please install Certbot."
    exit 1
fi

# Run Certbot renewal
echo "Running Certbot renewal..."
$CERTBOT_CMD renew --quiet --non-interactive --deploy-hook "systemctl reload nginx && cp $LE_LIVE_PATH/fullchain.pem $KEYS_DIR && cp $LE_LIVE_PATH/privkey.pem $KEYS_DIR"

# Check if Certbot renewal was successful
if [ $? -eq 0 ]; then
    echo "Certbot renewal completed successfully."
else
    echo "Certbot renewal failed."
    exit 1
fi
