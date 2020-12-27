'use strict'

var mongoose = require('mongoose')
var Schema   = mongoose.Schema;
    
var currentDate = function(){
    var timeObject = new Date();
    timeObject.setHours( timeObject.getHours() - 5);
    return timeObject;
};

var CommentModel = new Schema({
    claps: { type:Number },
    no_claps: { type:Number },
    postId:{ type: Schema.ObjectId, ref:'Posts', required: true },
    comments: [ { author: { type: String }, text: String } ],
	fecha_creacion: { type: Date, default: currentDate()},
	fecha_modificacion: { type: Date, default: currentDate()},
});

CommentModel.methods.clap = function(){
    this.claps++
    return this.save();
}
CommentModel.methods.no_clap = function(){
    this.no_claps++
    return this.save();
}

CommentModel.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}

module.exports = mongoose.model('Comments', CommentModel);
