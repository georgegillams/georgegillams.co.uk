import { ID_REGEX, INT_REGEX, PASSWORD_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const commentsAllowedAttributes = [
  { attribute: 'paymentToken', pattern: PASSWORD_REGEX },
  { attribute: 'paymentAmount', pattern: INT_REGEX },
  { attribute: 'paymentId', pattern: ID_REGEX },
  { attribute: 'resendId', pattern: ID_REGEX },
];

export default commentsAllowedAttributes;
