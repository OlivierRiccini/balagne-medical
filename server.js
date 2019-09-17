const express = require('express');
const path = require('path');
const app = express();
const fs = require("fs");

const appName = process.env.HEROKU_APP_NAME;
if (appName) {
  const data = fs.readFileSync('./src/environments/environment.prod.ts', 'utf-8');
  const appURL = `URL: 'https://${appName}.herokuapp.com',`;
  const newValue = data.replace(/URL:(.*)/g, appURL);
  fs.writeFileSync('./src/environments/environment.prod.ts', newValue, 'utf-8');
}

// Serve static files....
app.use(express.static(__dirname + '/dist/balagne-medical'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/balagne-medical/index.html'));
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);
