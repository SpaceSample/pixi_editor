const AttrType = {
  NUMBER: Symbol(),
  STRING: Symbol(),
  POINT: Symbol(),
  COLOR: Symbol(),
};
const checkRequeiredAttrType = (attrs, attrDef) => {
  if(!attrDef) {
    return true;
  }
  for (let k in attrDef) {
    if (attrDef[k].isRequired){
      if (!attrs || attrs[k] === null || attrs[k] === undefined) {
        return false;
      }
    }
  }
  return true;
};
export { AttrType, checkRequeiredAttrType };