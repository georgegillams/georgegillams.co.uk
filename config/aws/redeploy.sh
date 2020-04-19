# #!/bin/bash

cd /home/ubuntu
if [ -d build ]; then
  sleep 10 # wait to ensure the file transfer is complete
  cd georgegillams.co.uk
  git fetch && git reset --hard origin/master && git pull
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci
  pm2 stop all
  rm -rf build && mv ../build ./
  pm2 start all
else
  echo "No new version to deploy"
fi

