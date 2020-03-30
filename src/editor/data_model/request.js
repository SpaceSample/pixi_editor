const readLayoutJson = callback => {
  fetch('/assets/layout.json').then(function (response) {
    return response.json();
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

export { readLayoutJson, sendLayoutJson };