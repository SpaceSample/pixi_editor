import React, { useContext } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getComponentSymbol } from './components';
import { DataContext } from './data_model';

const DataItem = ({ data }) => {
  const { state, dispatch } = useContext(DataContext);

  if (!data || !data.id) {
    return null;
  }
  const type = data.t || 'Container';
  const onKeyDown = e => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      if (state.data.id === state.selection) {
        alert('Cannot delete root container.');
      } else {
        if (window.confirm(`Delete "${state.selection}"?`)) {
          dispatch({ type: 'deleteNode' });
        }
      }
    } else if (e.ctrlKey && (e.keyCode === 38 || e.keyCode === 40)) {
      dispatch({ type: 'changeOrder', up: e.keyCode === 38 });
    } else if (e.ctrlKey && (e.keyCode === 37 || e.keyCode === 39)) {
      dispatch({ type: 'changeLevel', up: e.keyCode === 37 });
    }
  };
  return (
    <TreeItem
      nodeId={data.id}
      label={getComponentSymbol(type) + ' ' + data.id}
      onClick={() => dispatch({ type: 'select', id: data.id })}
      onKeyDown={onKeyDown}
    >
      {Array.isArray(data.c) ? data.c.map(childData => (<DataItem data={childData} key={childData.id} />)) : null}
    </TreeItem>
  );
};

const Tree = ({ data }) => {
  const { state } = useContext(DataContext);
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <DataItem data={state.data} />
    </TreeView>
  );
};

export default Tree;