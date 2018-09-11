/* eslint-disable no-console */

const fs = require('fs');
const colors = require('colors');
const { execSync } = require('child_process');

console.log('Bringing in new code'.white);
console.log('');

execSync(
  'cp -R ../georgegillams.co.uk/api/* ./api && cp -R ../georgegillams.co.uk/src/components/* ./src/components && cp -R ../georgegillams.co.uk/src/containers/* ./src/containers/',
);

console.log('All done.  👍');
console.log('');

console.log(
  'WARNING: Be aware that some index.js files may have been broken by this process.'
    .red,
);
console.log(
  'To revert a broken index file, use git checkout origin/master <PROJECT_FILE_PATH>'
    .red,
);
console.log('');
