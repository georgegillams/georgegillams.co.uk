import {
  UNAME_REGEX,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  STRING_REGEX,
} from '../../../src/utils/constants';

const usersAllowedAttributes = [
  { attribute: 'name', pattern: STRING_REGEX },
  { attribute: 'uname', pattern: UNAME_REGEX },
  { attribute: 'email', pattern: EMAIL_REGEX },
  { attribute: 'admin', pattern: 'BOOL' },
  { attribute: 'password', pattern: PASSWORD_REGEX },
];

export default usersAllowedAttributes;
