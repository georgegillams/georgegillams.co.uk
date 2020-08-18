const COMMON_REDIS_INFORMATION_STORES = ['analytics', 'emails', 'notifications', 'users'];
const REDIS_INFORMATION_STORES = [
  ...COMMON_REDIS_INFORMATION_STORES,
  'blogs',
  'comments',
  'payments',
  'profiles',
  'stripepayments',
  'support',
  'userDetails',
];
const REDIS_STORES = [...REDIS_INFORMATION_STORES, 'emailVerificationCodes', 'magiclinks', 'sessions'];

export default { COMMON_REDIS_INFORMATION_STORES, REDIS_INFORMATION_STORES, REDIS_STORES };
export { COMMON_REDIS_INFORMATION_STORES, REDIS_INFORMATION_STORES, REDIS_STORES };
