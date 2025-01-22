FROM node:20

# Set the working directory
WORKDIR /app

# Copy dependencies definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Compile Sass for production
RUN npm run compile:sass

# Expose the application port
EXPOSE 5000

# Use the production start script
CMD ["npm", "run", "start:prod"]
