import React, { useReducer } from "react";
import select from './select';
import add from './add';
import update from './update';

const initialState = {
  selection: null,
  data: { id: 'root' }
};
const DataContext = React.createContext({});

const reducerMap = {
  select,
  add,
  update,
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