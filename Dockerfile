# Multi-stage build for production
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm install

# Copy all source code
COPY . .

# Build only the client
RUN npx vite build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies AND tsx (we need it to run TypeScript)
RUN npm install --omit=dev && npm install tsx

# Copy the built client from builder stage
COPY --from=builder /app/dist/public ./dist/public

# Copy source files
COPY server ./server
COPY shared ./shared

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application with tsx
CMD ["npx", "tsx", "server/index.ts"]
