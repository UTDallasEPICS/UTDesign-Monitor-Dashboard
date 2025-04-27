#!/bin/bash
# Wait for server to be up
while ! nc -z localhost 3000; do
  sleep 1
done

# Start Chromium with the desired settings
/usr/bin/chromium-browser \
  --no-sandbox \
  --disable-dev-shm-usage \
  --start-maximized \
  --noerrdialogs \
  --disable-infobars \
  --start-fullscreen \
  --disable-software-rasterizer \
  --ignore-gpu-blocklist \
  --restore-last-session \
  --disable-gpu \
  --disable-accelerated-video-decode \
  --disable-accelerated-video-encode \
  --disable-accelerated-mjpeg-decode \
  --remote-debugging-port=9222 \
  http://localhost:3000
