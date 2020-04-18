sudo service cron start
chmod g+s /usr/bin/crontab
sudo crontab ./config/aws/cron
