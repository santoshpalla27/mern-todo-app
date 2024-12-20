# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Set environment variable to use legacy OpenSSL provider
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the app for production with minification.
RUN npm run build

# Use the official nginx image.
FROM nginx:stable-alpine

# Copy build files to nginx's default public directory.
COPY --from=0 /usr/src/app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Run nginx on container startup.
CMD ["nginx", "-g", "daemon off;"]