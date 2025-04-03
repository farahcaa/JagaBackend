FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application's port
EXPOSE 3000

# Install nodemon globally
RUN npm install -g nodemon

# Command to run the application with nodemon
CMD ["nodemon", "server.js"]
