'use strict';

var express = require('express');
var { CommentControll } = require('../Controllers/index');
const { decodeApply } = require('../middleware/index');
var route = express.Router();

route.post('/comment_create/', decodeApply.autenticacion, CommentControll.createNewComment);
route.get('/comment_read/:_id', decodeApply.autenticacion, CommentControll.readCommnetOnPost);
route.put('/comment_update/:_id', decodeApply.autenticacion, CommentControll.editToComment);

module.exports = route