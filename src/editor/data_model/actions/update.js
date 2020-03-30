import { findDataNodeByID } from '../data_utils';

const update = (state, action) => {
  const data = findDataNodeByID(state.data, action.id);
  if (!data) {
    return state;
  }
  if(action.name === 'id') {
    data.id = action.value;
    state.selection = action.value;
  } else {
    data.a = data.a || {};
    data.a[action.name] = action.value;
  }
  return { ...state};
};

export default update;