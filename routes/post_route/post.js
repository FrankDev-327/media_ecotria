'use strict';

var express = require('express');
var { PostControll } = require('../Controllers/index');
const { decodeApply } = require('../middleware/index');
var api = express.Router();

api.post('/post_create/', decodeApply.autenticacion, PostControll.createPost)
api.put('/post_update/:_id', decodeApply.autenticacion, PostControll.updateMyPost)
api.get('/post_lists/', decodeApply.autenticacion, PostControll.listMyPosts)
api.get('/post_view/:_id', decodeApply.autenticacion, PostControll.viewMyPosts);
api.delete('/post_delete/:_id', decodeApply.autenticacion, PostControll.deteleMyPost);

module.exports = api