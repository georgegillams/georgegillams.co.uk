import fetch from 'node-fetch';
import moment from 'moment';

const POTS_REVEAL = [
  'Gifts',
  'Software + Subscriptions',
  'Travel',
  'Emergencies',
  'Extras',
  'Exercise extras',
  'Season ticket',
];

function getMonthsElapsedPercentage() {
  const result = moment().diff(`${moment().format('YYYY')}-01-01`, 'months');
  console.log(`result`, result);
  return (result * 100) / 12;
}

function monzoPots() {
  return new Promise((resolve, reject) => {
    const accessToken = process.env.MONZO_ACCESS_TOKEN;

    if (!accessToken) {
      reject('No access token configured');
      return;
    }

    fetch('https://api.monzo.com/pots', {
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (!data || !data.pots) {
          reject('Error retrieving data');
          return;
        }

        let reducedData = data.pots.filter(
          pot => !pot.deleted && POTS_REVEAL.includes(pot.name),
        );
        reducedData = reducedData.map(pot => {
          return {
            name: pot.name,
            balance: parseFloat(pot.balance) / 100,
            goalAmount: parseFloat(pot.goal_amount) / 100,
            percentageTimeElapsed: getMonthsElapsedPercentage(),
            percentageComplete: pot.goal_amount
              ? (100 * pot.balance) / pot.goal_amount
              : 100,
          };
        });
        resolve(reducedData);
      });
  });
}

export default monzoPots;
