cd ~/georgegillams.co.uk
git pull
npm ci
pm2 stop all
npm run build:aws
pm2 restart all
