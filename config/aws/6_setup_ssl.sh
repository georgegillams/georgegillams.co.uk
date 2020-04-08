sudo /usr/bin/certbot-auto --nginx -d georgegillams.co.uk -d www.georgegillams.co.uk --debug

sudo mkdir -p /etc/pki/nginx
sudo openssl dhparam -out /etc/pki/nginx/dhparams.pem 2048
