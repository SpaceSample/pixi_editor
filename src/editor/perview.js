import React, { useContext } from 'react';
import { Stage } from '@inlet/react-pixi';
import ComponentMap, { checkRequiredAttrs } from './components';
import { DataContext } from './data_model';
import Rectangle from './components/Rectangle';

const dataCtxHolder = { ctx: {} };

const DataNode = ({ data }) => {
  if (!data || !data.id) {
    return null;
  }
  const type = data.t || 'Container';
  if (!checkRequiredAttrs(type, data.a)){
    return null;
  }

  const Component = ComponentMap[type];
  if (!Component) {
    console.log('Unknown Component');
    return null;
  }
  const children = Array.isArray(data.c) ? data.c.map(childData => (<DataNode data={childData} key={childData.id} />)) : [];

  if (data.id === dataCtxHolder.ctx.state.selection) {
    children.push(<Rectangle fill={0xaaaaff} x={0} y={0} width={10} height={10} key='selection_marker' />);
  }
  return React.createElement(Component, data.a, children);
};

const Perview = () => {
  dataCtxHolder.ctx = useContext(DataContext);
  return (
    <Stage>
      <DataNode data={dataCtxHolder.ctx.state.data} />
    </Stage>
  );
};

export default Perview;