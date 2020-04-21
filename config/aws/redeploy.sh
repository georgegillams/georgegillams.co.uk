# #!/bin/bash

cd /home/ubuntu
if [ -d build ]; then
  sleep 30 # wait to ensure the file transfer is complete
  mv build buildInProgress
  cd georgegillams.co.uk
  git fetch && git reset --hard origin/master && git pull
  sudo cp -R ./config/aws/errors /var/www/html/
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci
  pm2 stop all
  rm -rf build && mv ../buildInProgress ./build
  pm2 start all
else
  echo "No new version to deploy"
fi

