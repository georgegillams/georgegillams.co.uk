/* eslint-disable no-console */
const { execSync } = require('child_process');

const prompt = require('prompt');

// Create backup
const defaultBackupName = Date.now().toString();
const cliApiKey = process.argv[process.argv.indexOf('--apiKey') + 1];
const cliBackupLocation = process.argv[process.argv.indexOf('--backupsLocation') + 1];
const schema = {
  properties: {
    backupsLocation: {
      description: 'Where should we store backups?',
      default: cliBackupLocation,
      pattern: /.*/,
      message: 'Where should we store backups?',
      required: true,
    },
    backupName: {
      description: 'What shall we call this backup?',
      default: defaultBackupName,
      pattern: /.*/,
      message: '',
    },
    backupImages: {
      description: 'Do you want to backup image assets too? (Y/N)',
      default: 'No',
      pattern: /^(y|Y|yes|Yes|YEs|yeS|n|N|no|No)?$/, // allow Y/Yes/N/No (case-insensitive)
      message: 'Please answer Y/Yes or N/No',
    },
    apiKey: {
      description: 'Enter the admin API key to use for this backup',
      default: cliApiKey,
      pattern: /.*/,
      message: 'Enter the admin API key to use for this backup',
      required: true,
      hidden: true,
    },
  },
};

const performBackup = async (err, { backupsLocation, backupName, backupImages, apiKey }) => {
  if (err) {
    console.error(err);
    return;
  }

  execSync(`mkdir "${backupsLocation}/${backupName}"`);

  execSync(
    `wget https://www.georgegillams.co.uk/api/data-management/backup --header "apiKey: ${apiKey}" -O "${backupsLocation}/${backupName}/data.json"`
  );

  const shouldBackupImages = typeof backupImages === 'string' && backupImages.trim().toLowerCase().startsWith('y');
  if (shouldBackupImages) {
    execSync(
      `wget https://www.georgegillams.co.uk/api/images/download-zip --header "apiKey: ${apiKey}" -O "${backupsLocation}/${backupName}/images.zip"`
    );
  }
};

prompt.start();
prompt.get(schema, performBackup);
