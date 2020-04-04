import React, { useContext, useState, useEffect } from 'react';
import { findDataNodeByID, DataContext, checkID } from '../data_model';
import { AttrType, getAttrDef } from '../components';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  attr_item: {
    margin: '10px',
  },
}));

const ContinusHitButton = ({ onHitOnece, text }) => {
  const [hitStatus, setHitStatus] = useState({ count: 0 });
  const onPointerDown = () => {
    onHitOnece(++hitStatus.count);
    hitStatus.lastTimeSlot = hitStatus.lastTimeSlot ? (hitStatus.lastTimeSlot > 80 ? (hitStatus.lastTimeSlot - 80) : 80) : 320;
    setHitStatus({ ...hitStatus, timeout: setTimeout(onPointerDown, hitStatus.lastTimeSlot) });
  };
  const onPointerUp = () => {
    console.log('onPointerUp');
    if (hitStatus.timeout) {
      clearTimeout(hitStatus.timeout)
    }
    setHitStatus({ count: 0 });
  };
  return (
    <Button
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      title={text}
    >{text}</Button>
  );
};

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
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    );
  }
  if (defItem.type === AttrType.NUMBER) {
    const reduce = d => onValueChange((value ? value : 0) - d);
    const increase = d => onValueChange((value ? value : 0) + d);
    return (
      <div className={classes.attr_item}>
        <TextField
          required={defItem.required}
          id={name}
          label={name}
          variant="outlined"
          value={value || defItem.default || 0}
          error={(defItem.required && !value && value !== 0) || (!!value && isNaN(Number(value)))}
          onBlur={onBlur}
          onChange={onChange}
        />
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <ContinusHitButton onHitOnece={reduce} text={'➖'} />
          <ContinusHitButton onHitOnece={increase} text={'➕'} />
        </ButtonGroup>
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
          defaultValue={value || defItem.default || 0}
          error={(defItem.required && !value && value !== 0) || (!!value && isNaN(Number(value)))}
          onBlur={onBlur}
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
          onBlur={onBlur}
          onChange={onChange}
        />
      </div>
    );
  }
  if (defItem.type === AttrType.BOOL) {
    if (defItem.default !== null && defItem.default !== undefined && value !== true && value !== false) {
      value = defItem.default;
    }
    const onBoolChange = e => {
      onValueChange(!value)
    };
    return (
      <div className={classes.attr_item}>
        <Checkbox
          label={name}
          checked={value}
          onChange={onBoolChange}
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        <span>{name}</span>
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
          onBlur={onBlur}
          onChange={onObjChange}
        />
      </div>
    );
  }
  return null;
};

const MetaEditor = ({ meta, dispatch }) => {
  return (
    <div>
      <hr />
      <div key='_meta_title'>Meta</div>
      <form>
        <AttrItem
          key={`width`}
          name={`width`}
          defItem={{
            isRequired: false,
            type: AttrType.NUMBER,
            default: 540
          }}
          value={meta.width}
          onValueChange={v => dispatch({ type: 'updateMeta', name: 'width', value: Number(v) })}
        />
        <AttrItem
          key={`height`}
          name={`height`}
          defItem={{
            isRequired: false,
            type: AttrType.NUMBER,
            default: 960
          }}
          value={meta.height}
          onValueChange={v => dispatch({ type: 'updateMeta', name: 'height', value: Number(v) })}
        />
        <AttrItem
          key={`background.image`}
          name={`background image`}
          defItem={{
            isRequired: false,
            type: AttrType.STRING
          }}
          value={meta.background&&meta.background.image}
          onValueChange={v => dispatch({ type: 'updateMeta', name: 'background.image', value: v })}
        />
      </form>
    </div>
  );
};

const IDEditor = ({ dataID, onUpdate }) => {
  const [newID, setNewID] = useState(dataID);
  useEffect(() => setNewID(dataID), [dataID]);
  return (
    <AttrItem key={`id_${dataID}`} name="id" defItem={{ isRequired: true, type: AttrType.STRING }} value={dataID} onValueChange={setNewID} onBlur={() => onUpdate(newID)} />
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
  const isRootNode = state.data.id === state.selection;
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
      }} />
      <form>
        {attrItems}
      </form>
      {isRootNode && data.meta && (<MetaEditor meta={data.meta} dispatch={dispatch}/>)}
    </div>
  );
};

export default AttrEditor;