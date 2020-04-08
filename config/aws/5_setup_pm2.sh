pm2 start ./config/aws/start_aws.sh --name "georgegillams.co.uk"
pm2 startup | grep sudo | bash
pm2 save
