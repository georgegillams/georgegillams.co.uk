import crypto from 'crypto';

const generateConstantValue = constantName =>
  `${constantName}-${crypto.randomBytes(6).toString('hex')}`;

const defineConstants = (...constantNames) => {
  const result = {};
  for (let i = 0; i < constantNames.length; i += 1) {
    const constantName = constantNames[i];
    result[constantName] = generateConstantValue(constantName);
  }
  return result;
};

export { generateConstantValue };
export default defineConstants;
