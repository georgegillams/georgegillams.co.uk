# #!/bin/bash

cd /home/ubuntu
if [ -f build.zip ]; then
  if [ ! -d build ]; then
    mkdir -p build
    sleep 5 # wait to ensure the file transfer is complete
    unzip build
    rm build.zip
    cd georgegillams.co.uk
    sudo git fetch && sudo git reset --hard origin/master && sudo git pull
    sudo cp -R ./config/aws/errors /var/www/html/
    echo "updating dependencies"
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci
    echo "stopping pm2 jobs"
    pm2 stop all
    rm -rf build && mv ../build ./
    echo "starting pm2 jobs"
    pm2 start all
  else
    echo "Waiting for existing deploy to complete"
  fi
else
  echo "No new version to deploy"
fi

