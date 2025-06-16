FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Set production environment
ENV NODE_ENV production

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
