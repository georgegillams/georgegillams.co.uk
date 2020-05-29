#!/usr/bin/env node

import { PROJECT_NAME } from 'helpers/constants';
import redis from 'utils/redis';

const clearDatabaseCollection = collectionName => {
  redis.del(`${PROJECT_NAME}_${collectionName}`);
};

export { clearDatabaseCollection };
export default { clearDatabaseCollection };
