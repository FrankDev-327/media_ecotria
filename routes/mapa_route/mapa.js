'use strict';

var express = require('express');
var { MapControll } = require('../../controlles/index');
var api = express.Router();

api.post('/create-mapa',  MapControll.Create)
api.put('/update-mapa/?id',  MapControll.Update)
api.get('/list-mapa',  MapControll.List)
api.get('/view-mapa/?id',  MapControll.View)
api.put('/delete-mapa/?id',  MapControll.Delete)

module.exports = api
