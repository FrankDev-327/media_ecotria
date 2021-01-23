'use strict';

var express = require('express');
var { MenuControll } = require('../../controlles/index');
var api = express.Router();

api.post('/create-menu', MenuControll.Create)
api.put('/update-menu/?id', MenuControll.Update)
api.get('/list-menu', MenuControll.List)
api.get('/view-menu/?id', MenuControll.View)
api.put('/delete-menu/?id', MenuControll.Delete)

module.exports = api
