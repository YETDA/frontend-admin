import fs from 'fs';
import https from 'https';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();

  // 이 부분 중요!
  app.use((req, res) => nextHandler(req, res));

  const httpsOptions = {
    key: fs.readFileSync('./cert/localhost-key.pem'),
    cert: fs.readFileSync('./cert/localhost-cert.pem'),
  };

  https.createServer(httpsOptions, app).listen(3000, () => {
    console.log('✅ HTTPS server ready on https://localhost:3000');
  });
});
