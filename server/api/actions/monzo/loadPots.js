import { datumLoad, datumLoadSingle, datumCreate } from '../../actions/datum';
import fetch from 'node-fetch';
import moment from 'moment';

const thisYear = moment().format('YYYY');
const lastYear = thisYear - 1;

const POT_CONFIGS = [
  {
    name: 'Season ticket',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Travel',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Emergencies',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Gifts',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Charlie',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Software + subscriptions',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Health',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Todoist and Lastpass',
    startDate: `${lastYear}-08-01`,
  },
  {
    name: 'Dropbox',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Domains',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Extras',
    startDate: `${thisYear}-05-01`,
  },
  {
    name: 'Exercise extras (monthly)',
  },
  {
    name: 'Groceries (monthly)',
  },
  {
    name: 'Social (monthly)',
  },
];

function getMonthsElapsedPercentage(potName) {
  if (potName.includes('(monthly)')) {
    return 0;
  }

  const config = POT_CONFIGS.filter(p => p.name === potName)[0];

  let result = moment().diff(config.startDate, 'months');
  return Math.min(100, (result * 100) / 12);
}

function loadPots(req) {
  return new Promise(resolve => {
    datumLoadSingle({
      redisKey: 'monzoApiKeys',
      resolveIfNotFound: true,
      sortKey: 'lastUpdatedTimestamp',
    }).then(accessToken => {
      const accessPassword = process.env.MONZO_ACCESS_PASSWORD;

      if (!accessToken) {
        resolve({ error: 'No access token configured' });
        return;
      }

      if (!req.body.password || req.body.password !== accessPassword) {
        resolve({ warning: 'Access password incorrect' });
        return;
      }

      fetch('https://api.monzo.com/pots', {
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken.key}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          if (!data || !data.pots) {
            resolve({
              error:
                'The Monzo token has expired. Tell George to generate a new one.',
            });
            return;
          }

          let reducedData = data.pots.filter(
            pot =>
              !pot.deleted &&
              POT_CONFIGS.filter(p => p.name === pot.name).length > 0,
          );
          reducedData = reducedData.map(pot => {
            const goalAmount = parseFloat(pot.goal_amount) / 100;
            const balance = parseFloat(pot.balance) / 100;
            const monthsElapsedPercentage = getMonthsElapsedPercentage(
              pot.name,
            );
            const expectedSavingsSoFar =
              (goalAmount * monthsElapsedPercentage) / 100;
            const shortfall = expectedSavingsSoFar - balance;
            return {
              name: pot.name,
              balance,
              goalAmount: parseFloat(pot.goal_amount) / 100,
              percentageTimeElapsed: monthsElapsedPercentage,
              shortfall: shortfall < 5 ? null : shortfall,
              percentageComplete: pot.goal_amount
                ? Math.ceil((100 * pot.balance) / pot.goal_amount)
                : 100,
            };
          });
          resolve(reducedData);
        });
    });
  });
}

export default loadPots;
