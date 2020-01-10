import { EMAIL_REGEX, DECIMAL_REGEX } from 'helpers/constants';

const commentsAllowedAttributes = [
  { attribute: 'amount', pattern: DECIMAL_REGEX },
  { attribute: 'email', pattern: EMAIL_REGEX },
];

export default commentsAllowedAttributes;
