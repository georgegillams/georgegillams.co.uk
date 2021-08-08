import { EMAIL_REGEX, DECIMAL_REGEX, ID_REGEX } from '@george-gillams/webapp/helpers/regexConstants';

const commentsAllowedAttributes = [
  { attribute: 'amount', pattern: DECIMAL_REGEX },
  { attribute: 'email', pattern: EMAIL_REGEX },
  { attribute: 'paymentId', pattern: ID_REGEX },
];

export default commentsAllowedAttributes;
