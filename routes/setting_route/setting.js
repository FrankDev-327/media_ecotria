'use strict';

var express = require('express');
var { SettingControll } = require('../Controllers/index');
const { decodeApply } = require('../middleware/index');
var api = express.Router();

api.post('/create-setting', /* decodeApply.autenticacion, */ SettingControll.Create)
api.put('/update-setting/?id', /* decodeApply.autenticacion, */ SettingControll.Update)
api.get('/list-setting', /* decodeApply.autenticacion, */ SettingControll.List)
api.get('/view-setting/?id', /* decodeApply.autenticacion, */ SettingControll.View)
api.put('/delete-setting/?id', /* decodeApply.autenticacion, */ SettingControll.Delete)

module.exports = api
