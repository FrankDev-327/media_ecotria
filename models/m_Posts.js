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
    //empresaId:{ type: Schema.ObjectId, ref:'Empresas', required: false },

    titlePost:{ type: String, trim: true, /* require:true  */},
    price:{ type: Number, /* require:true  */},
    catergory: { type: String, /* require:true  */},
    descriptionPost:{ type: String, /*require:true,*/ trim: true, },
    //Images:{ type: String, /* require:true  */},
    address: { type: String, /* require:true  */},
    phoneNumber: { type: String, /* require:true  */},
    email:{ type: String, /* require:true  */},

	createDate: { type: Date, default: new Date()},
	updateDate: { type: Date, default: new Date()},
});
module.exports = mongoose.model('Posts', PostSchema);
