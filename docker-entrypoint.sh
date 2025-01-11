#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
    echo "Starting in development mode..."
    npm install  # Ensure dev dependencies are installed
    npm run dev
elif [ "$NODE_ENV" = "test" ]; then
    echo "Starting in test mode..."
    npm install  # Ensure test dependencies are installed
    npm run test:e2e
else
    echo "Starting in production mode..."
    npm ci --only=production
    npm start
fi 