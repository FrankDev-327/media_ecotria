'use strict';

var express = require('express');
var { CommentControl } = require('../../controlles/index');
var route = express.Router();

route.post('/comment_create/', CommentControl.createNewComment);
route.get('/comment_read/:_id', CommentControl.readCommnetOnPost);
route.put('/comment_update/:_id', CommentControl.editToComment);

module.exports = route