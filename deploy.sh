#!/bin/bash

echo "🚀 Building TaskQwek Docker image..."
docker build -t taskqwek:latest .

echo "📦 Running TaskQwek container..."
docker run -d \
  --name taskqwek-app \
  -p 5000:5000 \
  --env-file .env \
  --restart unless-stopped \
  taskqwek:latest

echo "✅ TaskQwek is now running on http://localhost:5000"
echo "📊 Check container status: docker ps"
echo "📋 View logs: docker logs taskqwek-app"
echo "🛑 Stop container: docker stop taskqwek-app" 