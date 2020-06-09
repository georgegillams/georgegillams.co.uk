// TODO Move to message
const GENERIC_ERROR_MESSAGE = {
  type: 'error',
  message: 'Something went wrong. Please try again later.',
};
const COMMUNICATION_ERROR_MESSAGE = {
  type: 'error',
  message: 'Our servers are poorly. Please try again later.',
};
// TODO end

// TODO Move to client constants
const DECIMAL_REGEX = /^[0-9\\.]*$/gi;
const INT_REGEX = /^[0-9]*$/gi;
const SORT_CODE_REGEX = /^[0-9\\.-]*$/gi;
const STRING_REGEX = /^[A-Za-z0-9\\.\\ ]*$/gi;
const ID_REGEX = /^[A-Za-z0-9\\-]*$/gi;
const USERNAME_REGEX = /^[A-Za-z0-9\\.\\ ]*$/gi;
const REDIRECT_REGEX = /^[A-Za-z0-9\\.\\ \-\\_#\\/]*$/gi;
const NAME_REGEX = /^[A-Za-z\\ ]*$/gi;
const MONZOME_LINK_REGEX = /^(https?:\/\/)?monzo\.me\/[A-Za-z_-]+(\/.*)?$/gi;
const NON_EMOJI_REGEX = /[A-Za-zä\\ 0-9,]*/gi;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\\.\\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/gi;
const PASSWORD_REGEX = /.{6,}/gi;
const MD_COMPLETE_REGEX = /.*/gi; // TODO UPDATE
const MD_PARTIAL_REGEX = /.*/gi; // TODO UPDATE
const CARD_NUMBER_REGEX = /.*/gi; // TODO UPDATE
const CVV_REGEX = /.*/gi; // TODO UPDATE
const EXPIRY_REGEX = /.*/gi; // TODO UPDATE
const DATE_REGEX = /.*/gi; // TODO UPDATE
const ANYTHING_REGEX = /.*/gi;
// TODO end

// TODO Move to client constants
const CHECK_FOR_NEW_CONTENT_INTERVAL = 1000;
const COMPONENT_RELOAD_INTERVAL = CHECK_FOR_NEW_CONTENT_INTERVAL / 2;
// TODO end

// TODO Move to server constants
const { NODE_ENV, PROJECT_UNDER_TEST } = process.env;
const SESSION_SECRET =
  NODE_ENV === 'development' || PROJECT_UNDER_TEST
    ? 'TEST'
    : process.env.SESSION_SECRET;

const REDIS_INFORMATION_STORES = [
  'analytics',
  'blogs',
  'comments',
  'emails',
  'notifications',
  'payments',
  'profiles',
  'stripepayments',
  'support',
  'userDetails',
  'users',
];
const REDIS_STORES = [
  ...REDIS_INFORMATION_STORES,
  'emailVerificationCodes',
  'magiclinks',
  'sessions',
];
// TODO end

const STRIPE_PUBLIC_API_KEY = process.env.STRIPE_PUBLIC_API_KEY
  ? process.env.STRIPE_PUBLIC_API_KEY
  : 'pk_test_cgQazYLEKCzNFGFuRfq0TL8N00Cj3LIfai';

export {
  ANYTHING_REGEX,
  CARD_NUMBER_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMMUNICATION_ERROR_MESSAGE,
  COMPONENT_RELOAD_INTERVAL,
  CVV_REGEX,
  DATE_REGEX,
  DECIMAL_REGEX,
  EMAIL_REGEX,
  EXPIRY_REGEX,
  GENERIC_ERROR_MESSAGE,
  ID_REGEX,
  INT_REGEX,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NODE_ENV,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  PROJECT_UNDER_TEST,
  REDIRECT_REGEX,
  REDIS_INFORMATION_STORES,
  REDIS_STORES,
  SESSION_SECRET,
  SORT_CODE_REGEX,
  STRING_REGEX,
  STRIPE_PUBLIC_API_KEY,
  USERNAME_REGEX,
};
export default {
  ANYTHING_REGEX,
  CARD_NUMBER_REGEX,
  CHECK_FOR_NEW_CONTENT_INTERVAL,
  COMMUNICATION_ERROR_MESSAGE,
  COMPONENT_RELOAD_INTERVAL,
  CVV_REGEX,
  DATE_REGEX,
  DECIMAL_REGEX,
  EMAIL_REGEX,
  EXPIRY_REGEX,
  GENERIC_ERROR_MESSAGE,
  ID_REGEX,
  INT_REGEX,
  MD_COMPLETE_REGEX,
  MD_PARTIAL_REGEX,
  MONZOME_LINK_REGEX,
  NAME_REGEX,
  NODE_ENV,
  NON_EMOJI_REGEX,
  PASSWORD_REGEX,
  PROJECT_UNDER_TEST,
  REDIRECT_REGEX,
  REDIS_INFORMATION_STORES,
  REDIS_STORES,
  SESSION_SECRET,
  SORT_CODE_REGEX,
  STRING_REGEX,
  STRIPE_PUBLIC_API_KEY,
  USERNAME_REGEX,
};
