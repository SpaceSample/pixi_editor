const importData = (state, action) => {
  return { ...state, data: action.data, selection: null};
};

export default importData;