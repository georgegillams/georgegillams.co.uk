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
    startDate: `${thisYear}-12-01`,
    startAmount: 291.67,
  },
  {
    name: 'Emergencies',
    startDate: `${thisYear}-12-01`,
    startAmount: 291.67,
  },
  {
    name: 'Gifts',
    startDate: `${thisYear}-12-01`,
  },
  {
    name: 'Charlie',
    startDate: `${thisYear}-12-01`,
  },
  {
    name: 'Rents',
    startDate: `${thisYear}-12-01`,
  },
  {
    name: 'Extras',
    startDate: `${thisYear}-12-01`,
    startAmount: 291.67,
  },
  {
    name: 'Subscriptions (yearly) - Dropbox, Todoist and Domains',
    startDate: `${thisYear}-12-01`,
  },
  {
    name: 'Dentist and prescriptions',
    startDate: `${thisYear}-12-01`,
  },
  {
    name: 'Buffer',
  },
  {
    name: 'Eating out',
  },
  {
    name: 'Aerial (monthly)',
  },
  {
    name: 'Weekly',
  },
  {
    name: 'Leftover',
  },
];

export default POT_CONFIGS;
