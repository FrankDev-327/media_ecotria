'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GustaSchema = new Schema({
    subscriptorId: {
        type: String,
    },
    meGusta: {
        type: Number,
        required: true,
        trim: true
    },
    noMeGusta: {
        type: Number,
    },
    postId: {
        type: String,
    },
    fecha_creacion: {
        type: Date,
        default: new Date().toISOString()
    },
});

module.exports = mongoose.model('GustaNoGusta', GustaSchema);