'use strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;
var MenuSchema = new Schema({
	order: { type: Number, required: true },
	titulo: { type: String, required: true },
	url: { type: String, required: true },
	icon: { type: String, required: true },
	showlogueado: { type: Number, required: true },
});
module.exports = mongoose.model('Menu', MenuSchema);


