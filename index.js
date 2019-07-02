/* Progressively working through the Node Dev Roadmap cloned at https://github.com/LiamOSullivan/Nodejs-Dev-Roadmap*/

// https://nodejs.org/api/synopsis.html
// Hello World - create a basic Node server that sends 'Hello world' to the browser on port 3000 and a msg to the console
//Use https
// Create a self-sogned cert as per https://flaviocopes.com/express-https-self-signed-certificate/
const fs = require('fs'); //needed to read SSL cert and key
const https = require('https');
const hostname = '127.0.0.1';
const port = 3000;

const serverOptions = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

const server = https.createServer(serverOptions, (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world from Node! \n');

});

server.listen(port, hostname, () => {
  const t = new Date();
  const h = t.getHours();
  const m = t.getMinutes();
  console.log(`Server started on https://${hostname}:${port}`);
  console.log(`Time: ${h}:${m}`);
})