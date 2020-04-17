cd ~/georgegillams.co.uk
rm -rf tmp || true
mkdir tmp
cd tmp
git clone https://github.com/georgegillams/georgegillams.co.uk.git
cd georgegillams.co.uk
cp -R ../../node_modules ./
PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci
npm run build:aws
cd ~/georgegillams.co.uk
pm2 stop all
rm -rf build || true
mv ./tmp/georgegillams.co.uk/build ./
pm2 restart all
rm -rf tmp || true
