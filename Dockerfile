# 1. Build the Vite application
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. Serve the application using Nginx
FROM nginx:alpine
# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects the container to listen on port 8080 by default
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
