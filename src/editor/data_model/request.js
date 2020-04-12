const readJson = (url, callback) => {
  fetch(url).then(function (response) {
    return response.json();
  }).then(callback);
};

const readLayoutJson = callback => readJson('/assets/layout.json', callback);

const readText = (url, callback) => {
  fetch(url).then(function (response) {
    return response.text();
  }).then(callback);
};

const sendLayoutJson = (data, callback) => {
  const url = '/api/save';
  fetch(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
  }).then(response => response.text()).then(callback);
};

const readManifest = (callback) => {
  const url = '/api/manifest';
  fetch(url).then(response => response.json()).then(callback);
};

export { readLayoutJson, sendLayoutJson, readManifest, readText, readJson };