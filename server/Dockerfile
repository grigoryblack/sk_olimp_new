FROM node:20-alpine

WORKDIR /app

# Copy server files first
COPY server/package*.json ./

# Install production dependencies only
RUN npm install --only=production

# Copy the rest of the server files
COPY server/ ./

# Create .env file from environment variables
RUN touch .env
RUN echo "YANDEX_EMAIL=$YANDEX_EMAIL" >> .env
RUN echo "YANDEX_APP_PASSWORD=$YANDEX_APP_PASSWORD" >> .env
RUN echo "RECIPIENT_EMAIL=$RECIPIENT_EMAIL" >> .env

EXPOSE 3001
CMD ["node", "index.js"]
