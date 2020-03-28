import React, { useReducer } from "react";

const initialState = {
  selection: null,
  data: { id: 'root' }
};
const DataContext = React.createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case 'select':
      return { ...state, selection: state.selection === action.id ? null : action.id }
    default:
      return state;
  }
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