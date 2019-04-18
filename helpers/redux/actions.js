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
    const action = defineAction(
      actionDefinitions[i].name,
      actionDefinitions[i].attributes,
    );
    let actionName = actionDefinitions[i].name.split('-')[0];
    actionName = camelCase(actionName);
    result[actionName] = action;
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
