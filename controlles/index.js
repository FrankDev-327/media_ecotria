const { request } = require("express");

module.exports = {
    PostControll: require('./PostController/c_Post'),
    CommentControl : require('./CommentController/c_Comments'),
    MapControll: require('./ MapaController/c_Mapa'),
    SettinControll: require('./SettingController/c_Setting'),
    NotifyControl: require('./NoticiasController/c_Noticias'),
    MenuControll : require('./MenuController/c_Menu')

}