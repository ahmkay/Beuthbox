'use strict';
var host = 'localhost', port = 8080;
var path = require('path');
var app = require('express')();
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.listen(port, () => console.log(`Listening on http://${host}:${port}/`));