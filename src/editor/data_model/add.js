import { findDataNodeByID, newID } from './data_utils';

const add = (state, action) => {
  if (!state.selection) {
    return state;
  }
  const parent = findDataNodeByID(state.data, state.selection);
  if (!parent) {
    return state;
  }
  parent.c = parent.c || [];
  parent.c.push({
    id: newID(),
    t: action.component || 'Container'
  });
  return { ...state};
};

export default add;