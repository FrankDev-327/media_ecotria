'use strict'

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;
    
var currentDate = function(){
    var timeObject = new Date();
    timeObject.setHours( timeObject.getHours() - 5);
    return timeObject;
};

var PostSchema = new Schema({
    subscriberId:{ type: Schema.ObjectId, ref:'Suscribers', required: false },
    empresaId:{ type: Schema.ObjectId, ref:'Empresas', required: false },

    TitlePost:{ type: String, trim: true, require:true },
    Precio:{ type: Number, require:true },

    DescripcionPost:{ type: String, require:true, trim: true, },
    Imagenes:{ type: String, require:true },

	fecha_creacion: { type: Date, default: currentDate()},
	fecha_modificacion: { type: Date, default: currentDate()},
});
module.exports = mongoose.model('Posts', PostSchema);
