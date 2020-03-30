import { findParentDataNodeByID } from '../data_utils';

const deleteNode = (state, action) => {
  if (!state.selection) {
    return state;
  }
  const parent = findParentDataNodeByID(state.data, state.selection);
  if (!parent) {
    return state;
  }
  parent.c = parent.c || [];
  for (let i = 0; i < parent.c.length; i++) {
    if (parent.c[i].id === state.selection) {
      parent.c.splice(i, 1);
      return { ...state, selection: parent.id };
    }
  }
  return state;
};

export default deleteNode;