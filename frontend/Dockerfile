# Use the official Node.js 14 image as a base image for building the app
FROM node:14 AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the production version of the app
RUN npm run build

# Use an official nginx image to serve the app
FROM nginx:alpine

# Copy the production build to the nginx directory
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
