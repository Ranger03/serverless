# Use the official Node.js image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "server"]

# Build image showing files copied and not copied
# docker build --progress=plain -t your-node-app .
#docker run --name my_api_container -p 3000:3000 -d server-api

