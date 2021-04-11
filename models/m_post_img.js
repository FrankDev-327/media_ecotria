'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var currentDate = function () {
    var timeObject = new Date();
    timeObject.setHours(timeObject.getHours() - 5);
    return timeObject;
};

const PostImages = new Schema({
    post_img: { type: String },
    img_tag: { type: String },
    createDate: { type: Date, default: currentDate },
});

module.exports = mongoose.model('PostsImg', PostImages);
