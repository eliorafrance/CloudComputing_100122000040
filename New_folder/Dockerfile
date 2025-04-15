FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app into the container
COPY . .

# Expose the backend server port
EXPOSE 4000

# Start the backend server
CMD ["npm", "start"]
