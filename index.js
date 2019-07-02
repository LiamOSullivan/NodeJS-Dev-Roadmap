/* Progressively working through the Node Dev Roadmap forked at https://github.com/LiamOSullivan/Nodejs-Developer-Roadmap*/

// https://nodejs.org/api/synopsis.html
// Hello World - create a basic Node server that sends 'Hello world' to the browser on port 3000 and a msg to the console
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world from Node! \n');

});

server.listen(port, hostname, () => {
  console.log(`Server started at //http:${hostname}:${port}`);
})