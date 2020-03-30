const select = (state, action) => {
  return { ...state, selection: action.id };
};

export default select;