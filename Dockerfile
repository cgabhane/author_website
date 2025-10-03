# Multi-stage build for production

# Stage 1: Build the client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Stage 2: Setup server with built client
FROM node:18-alpine
WORKDIR /app

# Copy server files
COPY server/package*.json ./
RUN npm ci --production
COPY server/ ./

# Copy built client files
COPY --from=client-build /app/client/dist ./dist/public

# Copy shared schema
COPY shared/ ./shared/

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "index.js"]
