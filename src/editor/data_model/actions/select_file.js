const selectFile = (state, action) => {
  return { ...state, selectedFile: action.file };
};

export default selectFile;