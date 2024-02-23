# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

#Configure registry
RUN npm config set registry https://registry.npmjs.org

# Install any needed packages specified in package.json
RUN npm install --verbose

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
