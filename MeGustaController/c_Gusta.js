'use strict';

var GustaModel = require('../../Models/m_Gusta');

async function addGustaNoGusta(req, res) {
    try {
        var params = req.body;
        var gusta = new GustaModel(params);
        var data = await gusta.save();

        if (data == null) {
            return res.status(200).json({
                code: 'API_GNG_403',
                message: 'Adicionó la preferencia.'
            });
        }

        return res.status(200).json({
            data,
            code: 'API_GNG_200',
            message: 'Preferencia adherida.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en listMyPosts',
            code: 'API_GNG_500'
        });
    }
}

async function listGustaNoGusta(req, res) {
    try {
        var _postId = {
            postId: req.params.postId
        }
        var data = await GustaModel.find(_postId).exec();
        if (data !== null && data.length > 0) {
            return res.status(200).json({
                data,
                code: 'API_GNG_200',
                message: 'Me Gusta / No Me Gusta.'
            });
        }
        return res.status(200).json({
            code: 'API_GNG_403',
            message: 'Error al mostrar las preferencias.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en listMyPosts',
            code: 'API_GNG_500'
        });
    }
}

module.exports = {
    addGustaNoGusta,
    listGustaNoGusta,

}