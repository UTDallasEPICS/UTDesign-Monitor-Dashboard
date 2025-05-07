#!/bin/bash

# Set DISPLAY environment variable
export DISPLAY=:0

LOG_FILE="/home/amanb/chromium-start.log"

echo "Script started at $(date)" >> "$LOG_FILE"

# Max wait time for server (seconds)
MAX_WAIT=180
WAITED=0

# Wait until localhost:3000 is available
while ! nc -z localhost 3000; do
  echo "Waiting for server... ($WAITED seconds)" >> "$LOG_FILE"
  sleep 2
  WAITED=$((WAITED + 2))
  if [ "$WAITED" -ge "$MAX_WAIT" ]; then
    echo "Server did not start within $MAX_WAIT seconds. Exiting script." >> "$LOG_FILE"
    exit 1
  fi
done

echo "Server is ready! Launching Chromium at $(date)" >> "$LOG_FILE"

# Loop Chromium forever
while true; do
  echo "Starting Chromium at $(date)" >> "$LOG_FILE"
  
  /usr/bin/chromium-browser \
    --no-sandbox \
    --disable-dev-shm-usage \
    --start-maximized \
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
    --disable-extensions \
    --incognito \
    http://localhost:3000 >> "$LOG_FILE" 2>&1
  
  echo "Chromium crashed at $(date). Restarting in 5 seconds..." >> "$LOG_FILE"
  sleep 5
done
