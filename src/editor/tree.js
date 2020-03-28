import React, { useContext } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { getComponentSymbol } from './components';
import { DataContext } from './data_model';

const DataItem = ({ data }) => {
  const { /*state,*/ dispatch } = useContext(DataContext);

  if (!data || !data.id) {
    return null;
  }
  const type = data.t || 'Container';
  return (
    <TreeItem nodeId={data.id} label={getComponentSymbol(type) + ' ' + data.id} onClick={() => dispatch({ type: 'select', id: data.id })}>
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