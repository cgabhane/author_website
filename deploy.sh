#!/bin/bash
# ================================================
# Deployment script for chetangabhane.in
# Run this on your VPS as root
# Usage: bash deploy.sh
# ================================================

set -e  # Exit on any error

APP_DIR="/var/www/chetangabhane.in"
NGINX_CONF="/etc/nginx/sites-available/chetangabhane.in"

echo "=========================================="
echo " Deploying chetangabhane.in portfolio"
echo "=========================================="

# Step 1: Install Node.js 20 if not present
if ! command -v node &> /dev/null; then
  echo "[1/7] Installing Node.js 20..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
else
  echo "[1/7] Node.js already installed: $(node -v)"
fi

# Step 2: Install PM2 globally if not present
if ! command -v pm2 &> /dev/null; then
  echo "[2/7] Installing PM2..."
  npm install -g pm2
else
  echo "[2/7] PM2 already installed: $(pm2 -v)"
fi

# Step 3: Pull latest code into app directory
echo "[3/7] Pulling latest code..."
cd $APP_DIR
git pull origin main

# Step 4: Install all dependencies (needed for build)
echo "[4/7] Installing dependencies..."
npm install

# Step 5: Build the application
echo "[5/7] Building application..."

# Build frontend (Vite)
npx vite build

# Build backend (esbuild)
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outdir=dist \
  --external:./vite.js \
  --external:./static.js

# Build static module
npx esbuild server/static.ts \
  --platform=node \
  --packages=external \
  --format=esm \
  --outdir=dist

echo "  Build complete!"

# Step 6: Restart PM2
echo "[6/7] Restarting app with PM2..."
mkdir -p /var/log/pm2

pm2 stop chetangabhane-portfolio 2>/dev/null || true
pm2 delete chetangabhane-portfolio 2>/dev/null || true
pm2 start $APP_DIR/ecosystem.config.cjs
pm2 save

echo "  App running on port 5000"

# Step 7: Reload nginx
echo "[7/7] Reloading nginx..."
cp $APP_DIR/nginx.conf $NGINX_CONF
ln -sf $NGINX_CONF /etc/nginx/sites-enabled/chetangabhane.in
nginx -t && systemctl reload nginx

echo ""
echo "=========================================="
echo " Deployment complete!"
echo "=========================================="
echo ""
echo "Useful commands:"
echo "  pm2 status                          - Check app status"
echo "  pm2 logs chetangabhane-portfolio    - View app logs"
echo "  pm2 restart chetangabhane-portfolio - Restart app"
echo ""
