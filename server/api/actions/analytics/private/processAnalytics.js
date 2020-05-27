const groupingProperties = ['browser', 'os', 'url', 'utm_source', 'utm_medium'];

const keyForData = dataPoint => {
  const values = [];
  groupingProperties.forEach(gp => {
    values.push(dataPoint[gp]);
  });
  return values.join('_');
};

const insertOrUpdateCount = (list, dataPoint) => {
  const dataPointKey = keyForData(dataPoint);
  const matchingEntries = list.filter(l => l.key === dataPointKey);
  if (matchingEntries.length > 0) {
    matchingEntries[0].count += 1;
  } else {
    const newValue = { key: dataPointKey, count: 1 };
    groupingProperties.forEach(gp => {
      newValue[gp] = dataPoint[gp];
    });
    list.push(newValue);
  }
};

const processAnalytics = data => {
  const uniqueDataPoints = [];
  data.forEach(d => {
    insertOrUpdateCount(uniqueDataPoints, d);
  });
  return uniqueDataPoints;
};

export default processAnalytics;
