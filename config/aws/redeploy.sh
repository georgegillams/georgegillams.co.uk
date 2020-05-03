# #!/bin/bash

cd /home/ubuntu/georgegillams.co.uk
if [ ! -f ../buildInProgress ]; then
  if [ -f build.zip ]; then
    touch ../buildInProgress
    sleep 5 # wait to ensure the file transfer is complete
    unzip build -d newBuild
    rm build.zip
    sudo git fetch && sudo git reset --hard origin/master && sudo git pull
    echo "updating dependencies"
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci
    rm -rf build && mv newBuild/build build
    rm -rf newBuild
    sleep 5
    echo "completing deploy"
    rm ../buildInProgress
  else
    echo "No new version to deploy"
  fi
else
  echo "Waiting for existing deploy to complete"
fi
