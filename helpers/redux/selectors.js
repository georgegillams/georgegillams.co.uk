import camelCase from 'lodash/camelCase';
import { createSelector } from 'reselect';

const createSelectors = (id, stateEntities) => {
  const result = {};
  const selectGts = state => state.get(id);

  for (let i = 0; i < stateEntities.length; i += 1) {
    const entity = stateEntities[i];
    const selectorName = camelCase(`MAKE_SELECT_${entity}`);

    const entitySelector = () =>
      createSelector(
        selectGts,
        gtsState => gtsState.get(entity),
      );
    result[selectorName] = entitySelector;
  }
  return result;
};

const mapSelectors = selectors => {
  const result = {};
  const selectorNames = Object.keys(selectors);

  for (let i = 0; i < selectorNames.length; i += 1) {
    const shortName = camelCase(selectorNames[i].split('makeSelect'));
    result[shortName] = selectors[selectorNames[i]]();
  }

  return result;
};

export { mapSelectors };
export default createSelectors;
