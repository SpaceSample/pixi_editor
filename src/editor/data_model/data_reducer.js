import React, { useReducer } from "react";
import select from './actions/select';
import add from './actions/add';
import update from './actions/update';
import importData from './actions/import_data';
import deleteNode from './actions/delete_node';
import changeOrder from './actions/change_order';
import changeLevel from './actions/change_level';
import updateMeta from './actions/update_meta';
import selectFile from './actions/select_file';

const initialState = {
  selection: null,
  data: { id: 'root' }
};
const DataContext = React.createContext({});

const reducerMap = {
  select,
  add,
  update,
  importData,
  deleteNode,
  changeOrder,
  changeLevel,
  updateMeta,
  selectFile,
};

// const addReducer = (type, callback) => {
//   reducerMap[type] = callback;
// };

const reducer = (state, action) => {
  const reducerCallback = reducerMap[action.type];
  if (reducerCallback) {
    return reducerCallback(state, action);
  }
  return state;
};

const DataContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{state, dispatch}}>
      {props.children}
    </DataContext.Provider>
  );
};
const DataContextConsumer = DataContext.Consumer;
export { DataContext, DataContextProvider, DataContextConsumer };