'use strict';

var express = require('express');
var { MapaControll } = require('../Controllers/index');
var api = express.Router();

api.post('/create-mapa', /* md_auth.ensureAuth, */ MapaControll.Create)
api.put('/update-mapa/?id', /* md_auth.ensureAuth, */ MapaControll.Update)
api.get('/list-mapa', /* md_auth.ensureAuth, */ MapaControll.List)
api.get('/view-mapa/?id', /* md_auth.ensureAuth, */ MapaControll.View)
api.put('/delete-mapa/?id', /* md_auth.ensureAuth, */ MapaControll.Delete)

module.exports = api
