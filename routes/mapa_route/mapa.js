'use strict';

var express = require('express');
var { MapaControll } = require('../Controllers/index');
var api = express.Router();

api.post('/create-mapa',  MapaControll.Create)
api.put('/update-mapa/?id',  MapaControll.Update)
api.get('/list-mapa',  MapaControll.List)
api.get('/view-mapa/?id',  MapaControll.View)
api.put('/delete-mapa/?id',  MapaControll.Delete)

module.exports = api
