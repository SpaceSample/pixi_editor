import React, { useState, useEffect, useContext } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { readManifest, DataContext } from './data_model';

const FileItem = ({ path, name }) => {
  const { state, dispatch } = useContext(DataContext);
  const onSelect = () => {
    const file = path + name;
    if(state.selectedFile!== file) {
      dispatch({ type: 'selectFile', file });
    }
  };
  return (<TreeItem nodeId={name} label={name} onClick={onSelect}/>);
};

const DirItem = ({ path, name, data }) => {
  if (!data) {
    return null;
  }
  const childrenDataItems = [];
  data.files && data.files.forEach(f => childrenDataItems.push(<FileItem path={path + name + '/'} name={f} />));
  for (let k in data.dirs) {
    childrenDataItems.push(<DirItem path={path + name + '/'} name={k} data={data.dirs[k]} />)
  }
  return (
    <TreeItem
      nodeId={name}
      label={name}
    >
      {childrenDataItems}
    </TreeItem>
  );
};



const FileTree = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    readManifest(setData);
  }, []);
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <DirItem data={data} path="" name="assets" />
    </TreeView>
  );
};

export default FileTree;