
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const webDir = 'build/';
const assetsDir = webDir + 'assets/';
const layoutFile = 'layout.json';
const querystring = require('querystring');
const picManifestFile = 'picManifest.json';

const port = 3000;
const apiHandlerMap = {};
const mimeMap = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.js': 'application/x-javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'application/x-ico',
};
const send404 = (res) => {
  fs.readFile(webDir + '404.html', function (error, data404) {
    if (error) {
      console.log(error);
    }
    res.writeHead(404, { 'Content-Type': `text/html;charset='utf-8'` });
    res.write(data404);
    res.end();
  })
};
const sendAssets = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  const extname = path.extname(pathname);
  fs.readFile(webDir + pathname, function (err, data) {
    if (err) {
      send404(res);
    } else {
      res.writeHead(200, { 'Content-Type': `${mimeMap[extname]};charset='utf-8'`, "Cache-Control": "no-cache" });
      res.write(data);
      res.end();
    }
  })
};

const handleAPI = (req, res) => {
  const pathname = url.parse(req.url).pathname;
  if (apiHandlerMap[pathname]) {
    apiHandlerMap[pathname](req, res);
  } else {
    send404(res);
  }
};

const router = (req, res) => {
  if (req.url.startsWith('/api/')) {
    handleAPI(req, res);
  } else {
    sendAssets(req, res);
  }
};

http.createServer(router).listen(port);

apiHandlerMap['/api/save'] = (req, res) => {
  let body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log(body);
    if (body) {
      const filePath = assetsDir + layoutFile;
      fs.writeFileSync(filePath, body);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8', "Cache-Control": "no-cache" });
      res.write('success');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf8' });
      res.write('failed');
    }
    res.end();
  });
};

function readFileTree(rootPath){
  const pathList = fs.readdirSync(rootPath);
  const data = {
    files: [],
    dirs: {},
  };
  pathList.forEach(path => {
    if(fs.statSync(rootPath+path).isFile()) {
      data.files.push(path);
    } else {
      data.dirs[path] = readFileTree(rootPath + path + '/');
    }
  });
  return data;
}

apiHandlerMap['/api/manifest'] = (req, res) => {
  res.writeHead(200, {
    'Content-Type': `${mimeMap['.json']};charset='utf-8'`,
    "Cache-Control": "no-cache"
  });
  const data = readFileTree(assetsDir);
  res.write(JSON.stringify(data));
  res.end();
};

console.log(`Server running at http://localhost:${port}/`);