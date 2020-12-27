'use strict'

var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;
var NoticiasSchema = new Schema({
	noticia: { type: String, required: true },
	mensaje: { type: String, required: true },
	fuente: { type: String, required: true },
	fecha_creacion: { type: Date, default: new Date().toISOString() },
});
module.exports = mongoose.model('Noticias', NoticiasSchema);


