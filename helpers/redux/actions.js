import camelCase from 'lodash/camelCase';

const defineAction = (name, attributes) => {
  return (...args) => {
    const result = {
      type: name,
    };
    for (let i = 0; i < attributes.length; i += 1) {
      const attributeName = attributes[i];
      result[attributeName] = args[i];
    }
    return result;
  };
};

const defineActions = actionDefinitions => {
  const result = {};

  for (let i = 0; i < actionDefinitions.length; i += 1) {
    let name = Object.keys(actionDefinitions[i])[0];
    const actionName = actionDefinitions[i][name];
    const action = defineAction(actionName, actionDefinitions[i].attributes);
    name = camelCase(name);
    result[name] = action;
  }

  return result;
};

const mapActions = (dispatch, actions) => {
  const result = {};
  const actionNames = Object.keys(actions);

  for (let i = 0; i < actionNames.length; i += 1) {
    const actionName = actionNames[i];
    const action = actions[actionName];
    result[actionName] = (...args) => dispatch(action(...args));
  }

  return result;
};

export { mapActions, defineAction };
export default defineActions;
