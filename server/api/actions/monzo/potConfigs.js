import moment from 'moment';

const thisYear = moment().format('YYYY');
const lastYear = thisYear - 1;

const POT_CONFIGS = [
  {
    name: 'Season ticket',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Holiday',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Emergencies',
    startDate: `${lastYear}-12-01`,
    startAmount: 100,
  },
  {
    name: 'Gifts',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Charlie birthday',
    startDate: `${thisYear}-01-01`,
  },
  {
    name: 'Charlie Christmas',
    startDate: `${thisYear}-01-01`,
  },
  {
    name: 'Rents',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Extras',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Yearly subscriptions',
    startDate: `${lastYear}-12-01`,
    startAmount: 60,
  },
  {
    name: 'Health and hair',
    startDate: `${thisYear}-01-01`,
  },
  {
    name: 'Monthly subscriptions',
    monthly: true,
  },
  {
    name: 'Buffer',
    monthly: true,
  },
  {
    name: 'Eating out',
    monthly: true,
  },
  {
    name: 'Aerial',
    monthly: true,
  },
  {
    name: 'Weekly',
    monthly: true,
  },
  {
    name: 'Leftover',
    monthly: true,
  },
];

export default POT_CONFIGS;
