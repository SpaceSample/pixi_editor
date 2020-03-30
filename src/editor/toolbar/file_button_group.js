import React, { useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DataContext, readLayoutJson, sendLayoutJson } from '../data_model';

const FileButtonGroup = () => {
  const { state, dispatch } = useContext(DataContext);
  const reload = () => readLayoutJson(data => dispatch({ type: 'importData', data }))
  useEffect(reload, []);
  return (
    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      <Button
        onClick={reload}
        title={'refresh'}
        key={'refresh'}
      >{`🌌`}</Button>
      <Button
        onClick={() => sendLayoutJson(state.data, alert)}
        title={'save'}
        key={'save'}
      >{`💾`}</Button>
    </ButtonGroup>
  );
};

export default FileButtonGroup;