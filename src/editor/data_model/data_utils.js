const findDataNodeByID = (data, id) => {
  if (!data || !data.id) {
    return null;
  }
  if (data.id === id) {
    return data;
  }
  if (data.c && data.c.length) {
    for (let i = 0; i < data.c.length; i++) {
      const cr = findDataNodeByID(data.c[i], id);
      if (cr) {
        return cr;
      }
    }
  }
  return null;
};

const findParentDataNodeByID = (data, id) => {
  if (!data) {
    return null;
  }
  if (data.c && data.c.length) {
    for (let i = 0; i < data.c.length; i++) {
      if (data.c[i].id === id) {
        return data;
      }
      const cr = findParentDataNodeByID(data.c[i], id);
      if (cr) {
        return cr;
      }
    }
  }
  return null;
};

const newID = () => Date.now() + '';

const checkID = (data, id) => {
  return id && !findDataNodeByID(data, id)
};

export { findParentDataNodeByID, findDataNodeByID, newID, checkID };