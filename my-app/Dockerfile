FROM node:18

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Expose port 4173 (Vite default preview port)
EXPOSE 4173

# Run the Vite preview server
CMD ["npx", "vite", "preview", "--host"]
