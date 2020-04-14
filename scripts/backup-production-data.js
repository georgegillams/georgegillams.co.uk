const { execSync } = require('child_process');
const prompt = require('prompt');

// Create backup
let defaultBackupName = Date.now().toString();
const schema = {
  properties: {
    backupName: {
      description: 'What shall we call this backup?',
      default: defaultBackupName,
      pattern: /.*/,
      message: '',
    },
    apiKey: {
      description: 'Enter the admin API key to use for this backup',
      pattern: /.*/,
      message: 'Enter the admin API key to use for this backup',
      required: true,
      hidden: true,
    },
  },
};

const performBackup = async (err, { backupName, apiKey }) => {
  if (err) {
    console.error(err);
    return;
  }

  execSync(`mkdir ~/Dropbox/georgegillams.co.uk/backups/${backupName}`);

  execSync(
    `wget https://www.georgegillams.co.uk/api/dataManagement/backup --header "apiKey: ${apiKey}" -O ~/Dropbox/georgegillams.co.uk/backups/${backupName}/data.json`,
  );
};

prompt.start();
prompt.get(schema, performBackup);
