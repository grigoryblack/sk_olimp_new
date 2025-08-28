FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/

# Install server dependencies
WORKDIR /usr/src/app/server
RUN npm install

# Copy server source
COPY server/ .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["node", "index.js"]
