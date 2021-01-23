'use strict';

var { CommentModel } = require('../../models/index');

async function createNewComment(req, res) {
    try {
        var params = req.body;
        var comment = new CommentModel();

        comment.subscriberId = params.subscriberId
        comment.postId = params.postId
        comment.commentBox = params.commentBox
        var data = await comment.save();

        if (data == null) {
            return res.status(200).json({
                code: 'API_CM_404',
                message: 'Error al agregar su comentario.'
            });
        }

        return res.status(200).json({
            data,
            code: 'API_CM_200',
            message: 'Comentario registrado.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en createNewComment',
            code: 'API_CM_500'
        });
    }
}

async function readCommnetOnPost(req, res) {
    try {
        var _postId = {
            postId: req.params._id
        };
        var data = await CommentModel.find(_postId).exec();
        if (data == null || data.length <= 0) {
            return res.status(200).json({
                code: 'API_CM_404',
                message: 'Error al mostrar los comentarios.'
            });
        }

        return res.status(200).json({
            data,
            code: 'API_CM_200',
            message: 'Comentarios de una publicación.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en createNewComment',
            code: 'API_CM_500'
        });
    }
}

async function editToComment(req, res) {
    try {
        const newRG = { new: true };
        var params = req.body;
        var setId = {
            _id: req.params._id
        };
        var comment = {
            commentBox: params.commentBox
        }
        var data = await CommentModel.findByIdAndUpdate(setId, comment, newRG);
        if (data == null) {
            return res.status(200).json({
                code: 'API_CM_404',
                message: 'Error al actualizar el comentario.'
            });
        }

        return res.status(200).json({
            data,
            code: 'API_CM_200',
            message: 'Comentario actualizado.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en createNewComment',
            code: 'API_CM_500'
        });
    }
}

module.exports = {
    createNewComment,
    readCommnetOnPost,
    editToComment,


}