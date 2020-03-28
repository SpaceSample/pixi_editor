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

const newID = () => Date.now() + '';

export { findDataNodeByID, newID };