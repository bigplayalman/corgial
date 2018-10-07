import express from 'express';
import { ParseServer } from 'parse-server';
import ParseDashboard from 'parse-dashboard';
import config from './config';

const app = express();

const PORT = process.env.PORT || 1337;

const api = new ParseServer(config);

app.use('/parse', api);

const dashboard = new ParseDashboard({
  apps: [
    {
      serverURL: config.serverURL,
      appId: config.appId,
      masterKey: config.masterKey,
      appName: config.appName
    }
  ]
});

if(process.env.NODE_ENV !== 'production') {
  app.use('/dashboard', dashboard);
  console.info(`dashboard available at http://localhost:${PORT}/dashboard`); // eslint-disable-line no-console
}

app.get('/', (req, res) => res.redirect(301, '/parse'));

app.listen(PORT, (err) => {
  if(err) {
    return console.error(err);
  }
  console.log(`parse api listening on ${config.serverURL}`);
});
