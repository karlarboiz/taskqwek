FROM node:20

# Set the working directory
WORKDIR /app

# Copy dependencies definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose the application port
EXPOSE 5000

# Use the development start script
CMD ["npm", "start"]
