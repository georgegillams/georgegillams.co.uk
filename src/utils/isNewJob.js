const NEW_JOB_START = new Date(Date.UTC(2026, 7, 1));

export const isNewJob = (query = {}, now = Date.now()) => {
  if (query['new-job'] === 'true') {
    return true;
  }

  return now >= NEW_JOB_START.getTime();
};
