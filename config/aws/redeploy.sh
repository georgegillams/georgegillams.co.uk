# #!/bin/bash

cd /home/ubuntu
if [ ! -f buildInProgress ]; then
  if [ -f build.zip ]; then
    touch buildInProgress
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
    sleep 5
    echo "completing deploy"
    rm ../buildInProgress
  else
    echo "No new version to deploy"
  fi
else
  echo "Waiting for existing deploy to complete"
fi
