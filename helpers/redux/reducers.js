const inferPropertiesFromInitialState = s => {
  const result = [];
  const ar = s._root.nodes;
  for (let i = 0; i < ar.length; i += 1) {
    const nodes = ar[i].nodes;
    const entry = ar[i].entry;
    if (entry) {
      result.push(entry[0]);
    }
    if (nodes && nodes.length) {
      for (let j = 0; j < nodes.length; j += 1) {
        const res = nodes[j].entry[0];
        result.push(res);
      }
    }
  }
  return result;
};

const initialState = reducer => reducer(undefined, {});

export { inferPropertiesFromInitialState, initialState };
export default inferPropertiesFromInitialState;
