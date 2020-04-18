# #!/bin/bash

cd ~/georgegillams.co.uk
git fetch && git reset --hard origin/master && git pull
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci

cd ~/
rm -rf tmp_build || true
cp -R ./georgegillams.co.uk tmp_build
cd tmp_build
nice -n 14 npm run build:aws

cd ~/georgegillams.co.uk
pm2 stop all
rm -rf build || true
mv ../tmp_build/build ./
pm2 restart all

cd ~/
rm -rf tmp_build || true
