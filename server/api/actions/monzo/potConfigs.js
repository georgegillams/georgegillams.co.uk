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
    name: 'Yearly Subscriptions',
    startDate: `${lastYear}-12-01`,
    startAmount: 60,
  },
  {
    name: 'Dentist and prescriptions',
    startDate: `${thisYear}-01-01`,
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
