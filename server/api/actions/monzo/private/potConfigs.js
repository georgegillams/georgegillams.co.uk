import moment from 'moment';

const thisYear = moment().format('YYYY');
const lastYear = thisYear - 1;

const POT_CONFIGS = [
  {
    name: 'Weekly',
    monthly: true,
  },
  {
    name: 'Eating out',
    monthly: true,
  },
  {
    name: 'Buffer',
    monthly: true,
  },
  {
    name: 'Spare',
    monthly: true,
  },
  {
    name: 'Monthly subscriptions',
    monthly: true,
  },
  {
    name: 'Yearly subscriptions',
    startDate: `${lastYear}-12-01`,
    startAmount: 88.76,
  },
  {
    name: 'Emergency',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Holidays',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Presents',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Charlie',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Extras',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Health',
    startDate: `${lastYear}-12-01`,
  },
  {
    name: 'Season ticket',
    startDate: `${lastYear}-12-01`,
    startAmount: 4484.1,
  },
];

export default POT_CONFIGS;
