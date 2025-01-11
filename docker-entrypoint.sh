#!/bin/sh

if [ "$NODE_ENV" = "development" ]; then
    echo "Starting Express app in development mode..."
    npm install
    npm run dev
elif [ "$NODE_ENV" = "test" ]; then
    echo "Starting Express app in test mode..."
    npm install
    npm run test
else
    echo "Starting Express app in production mode..."
    npm ci --only=production
    node src/app.js
fi 