FROM node:18-alpine as base
WORKDIR /usr/src/app
COPY package*.json ./

# Development stage
FROM base as development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Production stage
FROM base as production
RUN npm ci --only=production
COPY . .
CMD ["node", "src/app.js"]
