'use strict'

const set = require('./setting/config');
const express = require('express');
const app = express();
var cors = require('cors')
const bodyParser = require('body-parser');

const {
    r_comment,
    r_map,
    r_menu,
    r_post,
    r_setting
} = require('./routes/index');

/******************************************************************/
 
app.use(cors())
app.use(bodyParser.urlencoded({
   extended: false
}));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(require('morgan')('dev'));

app.use((req, res, next) => {
   res.header('Content-Type:image/png');
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers',
      'Authorization,X-API-KEY,Origin,X-Rquested-Widht,' +
      'Content-Type,Accept,Acces-Control-Allow-Request-Method');
   res.header('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE');
   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
   next();
});

/************************************************/

app.use(set.path, r_comment);
app.use(set.path, r_map);
app.use(set.path, r_menu);
app.use(set.path, r_post)
app.use(set.path, r_setting);

/************************************************/

module.exports = app