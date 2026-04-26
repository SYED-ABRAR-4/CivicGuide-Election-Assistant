# 1. Build the Vite application using Node 22 (required by Tailwind v4 & Vite React plugin)
FROM node:22-alpine AS builder
WORKDIR /app

# Only copy package.json (NOT package-lock.json) 
# This completely bypasses the NPM "optional dependencies" and native binding bug on Alpine Linux
COPY package.json ./

# Install dependencies from scratch for the Linux environment
RUN npm install

# Copy the rest of the code and build
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
