'use strict';
var http=require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./server/routes/server');
var port = Number(process.env.PORT || 3000);
var mongoose   = require('mongoose');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname +'/client')));

app.use('/', routes);


var server = http.createServer(app).listen(port, function() {
  console.log("Listening on "+port);
});
module.exports = app;
