const cssModules = (styles = {}) => (...classNames) =>
  classNames.reduce((className, currentClass) => {
    if (currentClass && typeof currentClass === 'string') {
      const realName = styles[currentClass] || currentClass;
      return className ? `${className} ${realName}` : realName;
    }
    return className;
  }, '');

export { cssModules };
export default {
  cssModules,
};
