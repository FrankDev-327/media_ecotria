'use strict';

var express = require('express');
var { MenuControll } = require('../Controllers/index');
var api = express.Router();

api.post('/create-menu', /* md_auth.ensureAuth, */ MenuControll.Create)
api.put('/update-menu/?id', /* md_auth.ensureAuth, */ MenuControll.Update)
api.get('/list-menu', /* md_auth.ensureAuth, */ MenuControll.List)
api.get('/view-menu/?id', /* md_auth.ensureAuth, */ MenuControll.View)
api.put('/delete-menu/?id', /* md_auth.ensureAuth, */ MenuControll.Delete)

module.exports = api
