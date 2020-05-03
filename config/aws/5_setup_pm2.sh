pm2 start ./config/aws/ecosystem.config.js
pm2 startup | grep sudo | bash
pm2 save
