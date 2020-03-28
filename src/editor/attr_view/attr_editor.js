import React, { useContext } from 'react';
import { findDataNodeByID, DataContext, checkID } from '../data_model';
import {AttrType, getAttrDef} from '../components';
import TextField from '@material-ui/core/TextField';

const AttrItem = ({name, defItem, value, onChange}) => {
  if (defItem.type === AttrType.STRING) {
    return (
      <TextField
        required={defItem.required}
        id={name}
        label={name}
        variant="outlined"
        defaultValue={value}
        error={defItem.required && (!value)}
        onChange={onChange}
      />
    );
  }
  return null;
};

const AttrEditor = () => {
  const { state, dispatch } = useContext(DataContext);
  const data = findDataNodeByID(state.data, state.selection);
  if (!data) {
    return null;
  }
  const type = data.t || 'Container';
  const attrItems = [
    <AttrItem key={`id_${data.id}`} name="id" defItem={{isRequired: true, type: AttrType.STRING}} value={data.id} onChange={e => {
      const newID = e.currentTarget.value;
      if(checkID(state.data, newID)) {
        dispatch({type:'update', id: data.id, name: 'id', value: newID});
      }
    }} />
  ];
  const attrDef = getAttrDef(type);
  if (attrDef) {
    for (let k in attrDef) {
      attrItems.push(
        <AttrItem key={`${k}_${data.id}`} name={k} defItem={attrDef[k]} value={data.a && data.a[k]} onChange={e => dispatch({type:'update', id: data.id, name: k, value: e.currentTarget.value})} />
      );
    }
  }
  return (
    <div>
      <div key='_title'>Attributes</div>
      <form>
        {attrItems}
      </form>
    </div>
  );
};

export default AttrEditor;