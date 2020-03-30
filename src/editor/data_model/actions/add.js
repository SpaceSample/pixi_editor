import { findDataNodeByID, newID } from '../data_utils';

const add = (state, action) => {
  if (!state.selection) {
    return state;
  }
  const parent = findDataNodeByID(state.data, state.selection);
  if (!parent) {
    return state;
  }
  parent.c = parent.c || [];
  const nid = newID();
  parent.c.push({
    id: nid,
    t: action.component || 'Container'
  });
  return { ...state, selection: nid};
};

export default add;