import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { DataContext } from '../data_model';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const FileButtonGroup = () => {
  const [ importOpen, setImportOpen ] = useState(false);
  const [ exportOpen, setExportOpen ] = useState(false);
  const [ importStr, setImportStr ] = useState('');
  const { state, dispatch } = useContext(DataContext);
  const importData = () => {
    try {
      const data = JSON.parse(importStr);
      dispatch({type:'importData', data: data});
    }catch(e) {
      alert('Import failed, you need to use JSON format.');
    }
    setImportOpen(false);
  };
  return (
    <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
      <Button
        onClick={() => setImportOpen(true)}
        title={'import'}
        key={'import'}
      >{`📥`}</Button>
      <Button
        onClick={() => setExportOpen(true)}
        title={'export'}
        key={'export'}
      >{`📤`}</Button>
      <Dialog
        open={importOpen}
        onClose={() => setImportOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Export</DialogTitle>
        <DialogContent>
        <TextareaAutosize aria-label="empty textarea" placeholder="Empty" onChange={e => setImportStr(e.currentTarget.value)}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={importData} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={exportOpen}
        onClose={() => setExportOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Export</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {JSON.stringify(state.data, null, 2)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportOpen(false)} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ButtonGroup>
  );
};

export default FileButtonGroup;