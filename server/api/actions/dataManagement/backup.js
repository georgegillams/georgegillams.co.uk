import fs from 'fs';

import loadAllData from './private/loadAllData';

import authentication from 'utils/authentication';
import { UNAUTHORISED_READ, PROJECT_NAME } from 'helpers/constants';

const dataFilePath = 'server/server_content/data.json';

export default function load(req) {
  return authentication(req)
    .then(user => {
      if (user && user.admin) {
        return loadAllData();
      }
      throw UNAUTHORISED_READ;
    })
    .then(data => {
      const dataAnnotated = {
        projectName: PROJECT_NAME,
        timestamp: Date.now(),
        data,
      };
      return res => {
        fs.writeFileSync(dataFilePath, JSON.stringify(dataAnnotated));
        res.download(dataFilePath);
      };
    });
}
