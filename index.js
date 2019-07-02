/* Progressively working through the Node Dev Roadmap cloned at https://github.com/LiamOSullivan/Nodejs-Dev-Roadmap*/

// https://nodejs.org/api/synopsis.html
// Hello World - create a basic Node server that sends 'Hello world' to the browser on port 3000 and a msg to the console
// Use https - explore some more node https functions from https://nodejs.org/api/https.html
const fs = require('fs'); //needed to read SSL cert and key
const https = require('https');
const hostname = '127.0.0.1';
const port = 3000;

// Create a self-signed cert as per https://flaviocopes.com/express-https-self-signed-certificate/
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
  const m = t.getMinutes().toString().padStart(2, '0'); //add leading zero for numbers < 10
  console.log(`Server started on https://${hostname}:${port}`); //use template string
  console.log(`Time: ${h}:${m}`);
})

/***
http Methods
***/

//GET
//Get the page asscoiated with http status codes, listen for error
// https.get('https://en.wikipedia.org/wiki/List_of_HTTP_status_codes', (res) => {
//   //Destructure the response
//   const {
//     statusCode,
//     headers
//   } = res;
//   console.log(`GET res status: ${statusCode}`); //log the status code
//   console.log('GET headers x-client-ip: ' + headers["x-client-ip"]); //log part or all of the headers
// }).on('error', (e) => {
//   console.error(`GET error: ${e}`);
// });

//Request GET
const options = {
  hostname: 'en.wikipedia.org',
  port: 443,
  path: '/wiki/List_of_HTTP_status_codes',
  method: 'GET'
};

const req = https.request(options, (res) => {
  console.log("Started request GET");
  let resBody = ""; //the resposne is a ***stream***
  let i = 0;
  res.on('data', (chunk) => {
    console.log(`Chunk ${i} len ${chunk.length}`);
    resBody += chunk;
    i += 1;
  });

  res.on('end', () => {
    console.log("End request GET res");
    fs.writeFile("http-codes.html", resBody, (e) => {
      if (e) {
        console.error("Write file error " + e.message);
        throw e;
      }
      console.log("File downloaded");
    })
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.end();