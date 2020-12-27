'use strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;
var SettingSchema = new Schema({
	titulo_somos: { type: String, required: true },
	somos: { type: String, required: true },
	titulo_vision: { type: String, required: true },
	vision: { type: String, required: true },
	titulo_mision: { type: String, required: true },
	mision: { type: String, required: true },
});
module.exports = mongoose.model('Setting', SettingSchema);


