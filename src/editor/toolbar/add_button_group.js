import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DataContext } from '../data_model';
import { getComponentSymbol } from '../components';

const AddButtonGroup = () => {
  const { state, dispatch } = useContext(DataContext);
  const componentList = ['Container', 'Sprite', 'AnimatedSprite', 'Text'];
  const disabled = !state.selection;
  return (
    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" disabled={disabled}>
      {componentList.map(name => (
        <Button
          onClick={() => dispatch({type: 'add', component: name})}
          title={name}
          key={name}
        >{`+ ${getComponentSymbol(name)}`}</Button>
      ))}
    </ButtonGroup>
  );
};

export default AddButtonGroup;