FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --only=production

# Install build dependencies
RUN npm install --save-dev typescript tsup

COPY backend ./

# Build TypeScript with tsup
RUN npm run build

COPY --from=frontend-build /app/frontend/dist ./public

EXPOSE 3000

CMD ["node", "dist/server.js"]
