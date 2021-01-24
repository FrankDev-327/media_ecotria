'use strict';

var { PostModel } = require('../../models/index');

async function createPost(req, res) {
    try {
        var params = req.body;
        var post = new PostModel();
        
        post.subscriberId = params._id
        post.titlePost = params.titlePost;
        post.price = params.price;
        post.descriptionPost = params.descriptionPost;
        post.catergory = params.catergory;
        post.address = params.address;
        post.phoneNumber = params.phoneNumber;
        post.email = params.correo
        
        var data = await post.save();
        if (data == null) {
            return res.status(200).json({
                code: 'API_P_404',
                message: 'Error al registrar la publicación.'
            });
        }

        return res.status(200).json({
            data,
            code: 'API_P_200',
            message: 'Registo de la publicación con éxito.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en createPost',
            code: 'API_P_500'
        });
    }
}

async function updateMyPost(req, res) {
    try {
        var params = req.body;
        var setUpdateBy = {
            _id: req.params._id
        }
        const newRG = {
            new: true
        };
        var setUpdate = {
            TitlePost: params.TitlePost,
            Precio: params.Precio,
            DescripcionPost: params.DescripcionPost,
            //Imagenes: params.Imagenes,
            fecha_modificacion: await currentDate()
        }
        var data = await PostModel.findByIdAndUpdate(setUpdateBy, setUpdate, newRG);

        if (data !== null) {
            return res.status(200).json({
                data,
                code: 'API_P_200',
                message: 'Publicación actualizado.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Error al actualizar la Publicación.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en updateMyPost',
            code: 'API_P_500'
        });
    }
}

async function listMyPosts(req, res) {
    try {
        var idSub = {
            subscriberId: req.suscriber._id
        }
        var data = await PostModel.find(idSub).populate('subscriberId').exec();
        if (data !== null && data.length > 0) {
            return res.status(200).json({
                data,
                code: 'API_P_200',
                message: 'Mis publicaciones.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Error al mostrar su publicaciones.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en listMyPosts',
            code: 'API_P_500'
        });
    }
}

async function listAllPosts(req, res) {
    try {
        var data = await PostModel.find().exec();
        if (data !== null && data.length > 0) {
            return res.status(200).json({
                data,
                code: 'API_P_200',
                message: 'Publicaciones.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Error al mostrar las publicaciones.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en listAllPosts',
            code: 'API_P_500'
        });
    }
}

async function viewMyPosts(req, res) {
    try {
        var setFind = {
            _id: req.query._id
        };
        var data = await PostModel.findOne(setFind).exec();
        if (data !== null) {
            return res.status(200).json({
                data,
                code: 'API_P_200',
                message: 'Mi publicación.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Error al mostrar su publicación.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en viewMyPosts',
            code: 'API_P_500'
        });
    }
}

async function deteleMyPost(req, res) {
    try {
        var setDelete = {
            _id: req.params._id
        };
        var data = await PostModel.findByIdAndDelete(setDelete).exec();
        if (data !== null) {
            return res.status(200).json({
                data,
                code: 'API_P_200',
                message: 'Publicación eliminada.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Error al eliminar su publicación.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error en deteleMyPost',
            code: 'API_P_500'
        });
    }
}

var currentDate = async function () {
    var timeObject = new Date();
    timeObject.setHours(timeObject.getHours() - 5);
    return timeObject;
};

module.exports = {
    createPost,
    listAllPosts,
    updateMyPost,
    viewMyPosts,
    listMyPosts,
    deteleMyPost,

}