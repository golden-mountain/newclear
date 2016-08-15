const Express = require('express');

const config = require('./config');
// const favicon = require('serve-favicon');
const compression = require('compression');
const httpProxy = require('http-proxy');
const path = require('path');
const PrettyError = require('pretty-error');
const http = require('http');


const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(compression());
// app.use(favicon(path.join(__dirname, '..', 'static', 'img', 'favicon.ico')));

// app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

// Proxy to AXAPI server
app.use('/axapi', (req, res) => {
  proxy.web(req, res, {target: config.axapiUrl + '/axapi/', secure: false});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

app.use('/', (req, res) => {
  proxy.web(req, res, {target: 'http://' + config.apiHost + ':3000'});
});

// server.on('upgrade', (req, socket, head) => {
//   proxy.ws(req, socket, head);
// });

proxy.on('proxyReq', (proxyReq) => {
  // proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
  // console.log(proxyReq);
  // console.log('request axapi');
  proxyReq.setHeader('Content-type', 'application/json');
  proxyReq.setHeader('X-Forwarded-For', '172.17.65.32');
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  var json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
