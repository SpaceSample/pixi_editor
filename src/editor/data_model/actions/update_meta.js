const updateMeta = (state, action) => {
  if (!state.data) {
    return state;
  }
  state.data.meta = state.data.meta || {};
  if(action.name === 'background.image') {
    state.data.meta.background = state.data.meta.background || {};
    state.data.meta.background.image = action.value;
  } else {
    state.data.meta[action.name] = action.value;
  }
  return { ...state};
};

export default updateMeta;