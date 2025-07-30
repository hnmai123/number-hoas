# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your app
COPY . .

# Expose dev server port
EXPOSE 3000

# Run Next.js in dev mode
CMD ["npm", "run", "dev"]