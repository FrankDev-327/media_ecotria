'use strict'

var mongoose = require('mongoose')
var Schema   = mongoose.Schema;
    
var currentDate = function(){
    var timeObject = new Date();
    timeObject.setHours( timeObject.getHours() - 5);
    return timeObject;
};

var CommentModel = new Schema({
    subscriberId:{ type: Schema.ObjectId, ref:'Suscribers', /*required: false*/ },
    postId:{ type: Schema.ObjectId, ref:'Posts', required: true },
    commentBox:{ type: String },
    //ownerComment:{ type: Schema.ObjectId, /*ref:'Posts', required: false*/ },
	fecha_creacion: { type: Date, default: currentDate()},
	fecha_modificacion: { type: Date, default: currentDate()},
});

module.exports = mongoose.model('Comments', CommentModel);
