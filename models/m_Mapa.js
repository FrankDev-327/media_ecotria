'use strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;
var MapaSchema = new Schema({
	pos_x: { type: Number, required: true },
	pos_y: { type: Number, required: true },
	infowindow: { type: String, required: true },
});
module.exports = mongoose.model('Mapa', MapaSchema);


