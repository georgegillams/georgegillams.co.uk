import { INT_REGEX, ID_REGEX, PASSWORD_REGEX } from '../../src/utils/constants';

const standardAttributes = [
  { attribute: 'deleted', pattern: 'BOOL' },
  { attribute: 'id', pattern: ID_REGEX },
  { attribute: 'apiKey', pattern: PASSWORD_REGEX },
  { attribute: 'sessionKey', pattern: ID_REGEX },
  { attribute: 'timestamp', pattern: INT_REGEX },
];

function generateNewComponent(component, req, allAllowedAttributes) {
  const newComponent = {};
  for (let i = 0; i < allAllowedAttributes.length; i += 1) {
    const name = allAllowedAttributes[i].attribute;
    const pattern = allAllowedAttributes[i].pattern;
    if (req[component][name]) {
      if (pattern === 'BOOL') {
        newComponent[name] = !!req[component][name];
      } else {
        // pattern is a regex:
        if (pattern && req[component][name].toString().match(pattern)) {
          newComponent[name] = req[component][name];
        }
      }
    }
  }
  return newComponent;
}

export default function reqSecure(req, allowedAttributes) {
  const allAllowedAttributes = [...allowedAttributes, ...standardAttributes];

  req.body = generateNewComponent('body', req, allAllowedAttributes);
  req.query = generateNewComponent('query', req, allAllowedAttributes);
  req.headers = generateNewComponent('headers', req, allAllowedAttributes);
  return req;
}