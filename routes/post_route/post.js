'use strict';

var express = require('express');
var { PostControll } = require('../../controlles/index');
var api = express.Router();

api.post('/post_create/', PostControll.createPost);
api.post('/post_counter/', PostControll.countPostByCategory);
api.put('/post_update/:_id', PostControll.updateMyPost);
api.get('/post_lists/', PostControll.listMyPosts);
api.post('/post_list_all/', PostControll.listAllPosts)
api.get('/post_view/', PostControll.viewMyPosts);
api.delete('/post_delete/:_id', PostControll.deteleMyPost);

module.exports = api