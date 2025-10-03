#!/bin/bash
# Deployment script for VPS hosting

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Pull latest code
echo "📥 Pulling latest changes..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --prefix server --production
npm install --prefix client

# Build client
echo "🏗️  Building client..."
npm run --prefix client build

# Restart PM2 process
echo "♻️  Restarting application..."
pm2 restart chetan-portfolio || pm2 start ecosystem.config.js

# Show status
echo "✅ Deployment complete!"
pm2 status
