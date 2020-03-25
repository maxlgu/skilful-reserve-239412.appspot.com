// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START app]
const express = require('express');
const serveIndex = require('serve-index')
const app = express();
const longpoll = require("express-longpoll")(app);

app.use('/static', express.static('public'), serveIndex('public', {'icons': true}));

// long-polling is used to block the load end of the load-end-security-check app.
const longpollPath = '/longpolling.js';
longpoll.create(longpollPath);
longpoll.publish(longpollPath, { text: "trivial" });

app.get('/method-manifest', (req, res) => {
  res.status(200).links({
    'payment-method-manifest':
        '/static/max-payment-method/payment-manifest.json',
  });
  res.send('This is to sent the payment-method-manifest link so that the requester can fetch the json file again.');
});

app.get('/', (req, res) => {
  res.redirect('/static');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// [END app]

module.exports = app;
