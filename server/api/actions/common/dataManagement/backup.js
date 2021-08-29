import fs from 'fs';

import loadAllData from './private/loadAllData';

import authentication from 'server-utils/common/authentication';
import appConfig from 'helpers/appConfig';
import { UNAUTHORISED_READ } from 'server-utils/common/errorConstants';

const serverDir = 'server';
const serverContentDir = `${serverDir}/server_content`;
const dataFilePath = `${serverContentDir}/data.json`;

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
        projectName: appConfig.projectName,
        timestamp: Date.now(),
        data,
      };
      return res => {
        if (!fs.existsSync(serverDir)) {
          fs.mkdirSync(serverDir);
        }
        if (!fs.existsSync(serverContentDir)) {
          fs.mkdirSync(serverContentDir);
        }
        fs.writeFileSync(dataFilePath, JSON.stringify(dataAnnotated));
        res.download(dataFilePath);
      };
    });
}
