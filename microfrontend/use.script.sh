#!/bin/bash

LOG_FILE="/var/log/install_packages.log"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Ensure the script is run as root
if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

# Update and install necessary packages
log_message "Updating packages..."
yum update -y 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    log_message "Failed to update packages."
    exit 1
fi

log_message "Installing git..."
yum install -y git 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    log_message "Failed to install git."
    exit 1
fi

log_message "Installing Node.js 20 and npm..."
curl -sL https://rpm.nodesource.com/setup_20.x | bash - 2>&1 | tee -a "$LOG_FILE"
yum install -y nodejs 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    log_message "Failed to install Node.js 20 and npm."
    exit 1
fi

log_message "Verifying Node.js and npm installation..."
node_version=$(node -v 2>&1)
npm_version=$(npm -v 2>&1)
log_message "Node.js version: $node_version"
log_message "npm version: $npm_version"

if [[ "$node_version" < "v20" ]]; then
    log_message "Installed Node.js version is less than 20. Exiting."
    exit 1
fi

log_message "Installing pm2..."
npm install -g pm2 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    log_message "Failed to install pm2."
    exit 1
fi

pm2_version=$(pm2 -v 2>&1)
log_message "PM2 version: $pm2_version"

log_message "Installing http-server..."
npm install -g http-server 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    log_message "Failed to install http-server."
    exit 1
fi

http_server_version=$(http-server -v 2>&1)
log_message "http-server version: $http_server_version"

log_message "Installing Nginx..."
yum install -y nginx 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    log_message "Failed to install Nginx."
    exit 1
fi

log_message "Starting and enabling Nginx..."
systemctl start nginx 2>&1 | tee -a "$LOG_FILE"
systemctl enable nginx 2>&1 | tee -a "$LOG_FILE"
if [ $? -ne 0 ]; then
    log_message "Failed to start and enable Nginx."
    exit 1
fi

log_message "Packages installation completed."

# Create the .ssh directory and set the appropriate permissions
log_message "Creating .ssh directory..."
mkdir -p ~/.ssh
chmod 700 ~/.ssh
log_message ".ssh directory created and permissions set."

# Generate the SSH key pair on the EC2 instance
log_message "Generating SSH key pair..."
ssh-keygen -t rsa -b 4096 -C "prashantbasnet@gmail.com" -f ~/.ssh/id_rsa -q -N ""
log_message "SSH key pair generated."

# Add GitHub's host key to the known hosts file
log_message "Adding GitHub's host key to known hosts..."
ssh-keyscan github.com >> ~/.ssh/known_hosts
log_message "GitHub's host key added to known hosts."

# Set the appropriate permissions for the SSH key
log_message "Setting permissions for the SSH key..."
chmod 600 ~/.ssh/id_rsa
log_message "Permissions set for the SSH key."

# Create directories for Unisala services
log_message "Creating directories for Unisala services..."
mkdir -p /home/ec2-user/Unisala-University-Service
mkdir -p /home/ec2-user/Unisala-User-Service
mkdir -p /home/ec2-user/Unisala-Message-Service
mkdir -p /home/ec2-user/unisala-web
log_message "Directories for Unisala services created."

log_message "Packages installation and SSH setup completed."
