import { findParentDataNodeByID } from '../data_utils';

const changeOrder = (state, action) => {
  if (!state.selection) {
    return state;
  }
  const parent = findParentDataNodeByID(state.data, state.selection);
  if (!parent) {
    return state;
  }
  parent.c = parent.c || [];
  let index = -1;
  for (let i = 0; i < parent.c.length; i++) {
    if (parent.c[i].id === state.selection) {
      index = i;
      break;
    }
  }
  if (action.up && index > 0) {
    const tmp = parent.c[index - 1];
    parent.c[index - 1] = parent.c[index];
    parent.c[index] = tmp;
  } else if (!action.up && index < parent.c.length - 1) {
    const tmp = parent.c[index + 1];
    parent.c[index + 1] = parent.c[index];
    parent.c[index] = tmp;
  }
  return {...state};
};

export default changeOrder;