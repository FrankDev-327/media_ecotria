'use strict';

var express = require('express');
var { SettinControll } = require('../../controlles/index');
var api = express.Router();

api.post('/create-setting',  SettinControll.Create)
api.put('/update-setting/?id',  SettinControll.Update)
api.get('/list-setting',  SettinControll.List)
api.get('/view-setting/?id',  SettinControll.View)
api.put('/delete-setting/?id',  SettinControll.Delete)

module.exports = api
