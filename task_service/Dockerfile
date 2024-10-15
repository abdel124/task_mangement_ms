# Use the official Node.js image from the Docker Hub
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy the application code
COPY ./app /app

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app/app.js"]
