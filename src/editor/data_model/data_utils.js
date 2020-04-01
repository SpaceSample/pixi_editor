import * as PIXI from 'pixi.js';

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

const preloadAllResInData = (data, callback) => {
  const resList = [];
  const dfsFindRes = d => {
    if (!d) {
      return;
    }
    if (d.a) {
      if (d.a.anim) {
        const [url] = d.a.anim.split(':');
        if (url.endsWith('.json')) {
          resList.push(url);
        }
      }
      if (d.a.image) {
        resList.push(d.a.image);
      }
    }
    if (d.c) {
      d.c.forEach(dfsFindRes);
    }
  }
  dfsFindRes(data);
  resList.forEach(res => {
    PIXI.Loader.shared.add(res);
  });
  PIXI.Loader.shared.load(() => {
    console.log('All resources preload done.');
    callback && callback();
  });
}

export { findParentDataNodeByID, findDataNodeByID, preloadAllResInData, newID, checkID };