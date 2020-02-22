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
  },
  {
    name: 'Gifts',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Charlie',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Rents',
    startDate: `${lastYear}-12-01`,
    startAmount: 169.99,
  },
  {
    name: 'Extras',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Yearly subscriptions',
    startDate: `${lastYear}-12-01`,
    startAmount: 88.76,
  },
  {
    name: 'Health',
    startDate: `${lastYear}-12-01`,
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
    name: 'Spare',
    monthly: true,
  },
];

export default POT_CONFIGS;
