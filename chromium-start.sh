amanb@raspberrypi:~ $ cat chromium-start.sh
#!/bin/bash

# Set DISPLAY
export DISPLAY=:0

echo "Script started at $(date)" >> /home/amanb/chromium-start.log

# Wait until localhost:3000 is available
while ! nc -z localhost 3000; do
  echo "Waiting for server..." >> /home/amanb/chromium-start.log
  sleep 1
done

echo "Starting Chromium at $(date)" >> /home/amanb/chromium-start.log

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
  http://localhost:3000 >> /home/amanb/chromium-start.log 2>&1
amanb@raspberrypi:~ $
