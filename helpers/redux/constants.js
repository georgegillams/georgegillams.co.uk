// TODO Actually create a unique hash
const generateConstantValue = constantName => `${constantName}-hash`;

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
