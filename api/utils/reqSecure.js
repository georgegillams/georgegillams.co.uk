import { INT_REGEX, STRING_REGEX } from '../../src/utils/constants';

const standardAttributes = [
  { attribute: 'deleted', pattern: 'BOOL' },
  { attribute: 'id', pattern: STRING_REGEX },
  { attribute: 'timestamp', pattern: INT_REGEX },
];

export default function reqSecure(req, allowedAttributes) {
  const newBody = {};
  const allAllowedAttributes = [...allowedAttributes, ...standardAttributes];
  for (let i = 0; i < allAllowedAttributes.length; i += 1) {
    const name = allAllowedAttributes[i].attribute;
    const pattern = allAllowedAttributes[i].pattern;
    if (req.body[name]) {
      if (pattern === 'BOOL') {
        newBody[name] = !!req.body[name];
      } else {
        // pattern is a regex:
        if (pattern && req.body[name].toString().match(pattern)) {
          newBody[name] = req.body[name];
        }
      }
    }
  }

  req.body = newBody;
  return req;
}
