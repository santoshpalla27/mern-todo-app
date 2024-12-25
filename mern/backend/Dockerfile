FROM node:18.9.1

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5050

# Command to run the application
CMD ["npm", "start"]
