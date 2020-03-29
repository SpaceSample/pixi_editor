import React, { useContext, useState } from 'react';
import { findDataNodeByID, DataContext, checkID } from '../data_model';
import { AttrType, getAttrDef } from '../components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  attr_item: {
    margin: '10px',
  },
}));

const AttrItem = ({ name, defItem, value, onValueChange, onBlur }) => {
  const classes = useStyles();
  const onChange = e => onValueChange(e.currentTarget.value);
  if (defItem.type === AttrType.STRING) {
    return (
      <div className={classes.attr_item}>
        <TextField
          required={defItem.required}
          id={name}
          label={name}
          variant="outlined"
          defaultValue={value}
          error={defItem.required && (!value)}
          onBlur = {onBlur}
          onChange={onChange}
        />
      </div>

    );
  }
  if (defItem.type === AttrType.NUMBER) {
    return (
      <div className={classes.attr_item}>
        <TextField
          required={defItem.required}
          id={name}
          label={name}
          variant="outlined"
          defaultValue={value}
          error={(defItem.required && !value && value !== 0) || (!!value && isNaN(Number(value)))}
          onBlur = {onBlur}
          onChange={onChange}
        />
      </div>

    );
  }
  if (defItem.type === AttrType.POINT) {
    // TODO support standalone x y value
    return (
      <div className={classes.attr_item}>
        <TextField
          required={defItem.required}
          id={name}
          label={name}
          variant="outlined"
          defaultValue={value}
          error={(defItem.required && !value && value !== 0) || (!!value && isNaN(Number(value)))}
          onBlur = {onBlur}
          onChange={onChange}
        />
      </div>
    );
  }
  if (defItem.type === AttrType.COLOR) {
    return (
      <div className={classes.attr_item}>
        <TextField
          required={defItem.required}
          id={name}
          label={name}
          variant="outlined"
          defaultValue={value}
          error={defItem.required && (!value)}
          onBlur = {onBlur}
          onChange={onChange}
        />
      </div>
    );
  }
  if (defItem.type === AttrType.JSON) {
    const onObjChange = e => {
      try {
        const obj = JSON.parse(e.currentTarget.value);
        onValueChange(obj);
      } catch (e) { }
    };
    return (
      <div className={classes.attr_item}>
        <TextField
          required={defItem.required}
          id={name}
          label={name}
          variant="outlined"
          defaultValue={JSON.stringify(value)}
          error={defItem.required && (!value)}
          onBlur = {onBlur}
          onChange={onObjChange}
        />
      </div>
    );
  }
  return null;
};

const IDEditor = ({ dataID, onUpdate }) => {
  const[newID, setNewID] = useState(dataID);
  return (
    <AttrItem key={`id_${dataID}`} name="id" defItem={{ isRequired: true, type: AttrType.STRING }} value={dataID} onValueChange={setNewID} onBlur={() => onUpdate(newID)}/>
  )
};

const AttrEditor = () => {
  const { state, dispatch } = useContext(DataContext);
  const data = findDataNodeByID(state.data, state.selection);
  if (!data) {
    return null;
  }
  const type = data.t || 'Container';
  const attrItems = [];

  const attrDef = getAttrDef(type);
  if (attrDef) {
    for (let k in attrDef) {
      attrItems.push(
        <AttrItem key={`${k}_${data.id}`} name={k} defItem={attrDef[k]} value={data.a && data.a[k]} onValueChange={v => dispatch({ type: 'update', id: data.id, name: k, value: v })} />
      );
    }
  }
  return (
    <div>
      <div key='_title'>Attributes</div>
      <IDEditor dataID={data.id} onUpdate={newID => {
        if (data.id === newID) {
          return;
        }
        if (checkID(state.data, newID)) {
          dispatch({ type: 'update', id: data.id, name: 'id', value: newID });
        } else {
          alert("Name cannot be empty or duplicated.");
        }
      }}/>
      <form>
        {attrItems}
      </form>
    </div>
  );
};

export default AttrEditor;