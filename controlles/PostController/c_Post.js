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
                message: 'Post registration failed.'
            });
        }

        return res.status(200).json({
            data,
            code: 'API_P_200',
            message: 'Successful publication registration.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error in createPost',
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
            fecha_modificacion: await currentDate()
        }
        var data = await PostModel.findByIdAndUpdate(setUpdateBy, setUpdate, newRG);

        if (data !== null) {
            return res.status(200).json({
                data,
                code: 'API_P_200',
                message: 'Updated publication.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Failed to update Post.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error in updateMyPost',
            code: 'API_P_500'
        });
    }
}

async function updatePostImage(req, res) {
    try {
        const newRG = {
            new: true
        };
        var params = req.body;
        var id_img = {
            _id: params._id
        }
        var setImg = {
            Images: params.img
        };

        var data = await PostModel.findByIdAndUpdate(id_img, setImg, newRG);
        if (data !== null) {
            return res.status(200).json({
                data,
                code: 'API_P_200',
                message: 'Pots image updated.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Failed to update image post.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error in updateMyPost',
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
                message: 'My posts.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Error displaying your post'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error in listMyPosts',
            code: 'API_P_500'
        });
    }
}

async function listAllPosts(req, res) {
    try {
        var body = req.body;
        var page = body.currentPage <= 0 ? 1 : body.currentPage;
        console.log(page)
        var data = await PostModel.aggregate([{
            $facet: {
                pageInfo: [
                    { $group: { _id: null, count: { $sum: 1 } } }
                ],
                dataInfo: [
                    {
                        $skip: (parseInt(page) - 1) * parseInt(body.postsLimit)
                    },
                    {
                        $limit: parseInt(body.postsLimit)
                    },
                ]
            }
        },
        {
            $project: {
                info: "$dataInfo",
                total: "$pageInfo",
                _id: 0
            }
        }
        ]);

        if (data[0].info.length <= 0) {
            return res.status(200).json({
                code: 'API_P_404',
                message: 'No posts.'
            });
        }

        return res.status(200).json({
            data: data[0].info,
            total: data[0].total[0].count,
            page: parseInt(page),
            limit: parseInt(body.postsLimit),
            code: 'API_P_200',
            message: 'List of publications.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error in listAllPosts',
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
                message: 'My post.'
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
            message: 'Error in viewMyPosts',
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
                message: 'Post removed.'
            });
        }
        return res.status(200).json({
            code: 'API_P_403',
            message: 'Failed to delete your post.'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error in deteleMyPost',
            code: 'API_P_500'
        });
    }
}

async function countPostByCategory(req, res) {
    try {
        var data = await PostModel.aggregate([
            {
                $group: {
                    _id: "$catergory",
                    total: {
                        $sum: 1
                    },
                    price: {
                        $first: "$price"
                    }
                }
            },
            {
                $project: {
                    name_cat: "$_id",
                    total: 1,
                    price: 1,
                    _id: 0
                }
            }
        ]);

        if (data.length <= 0) {
            return res.status(200).json({
                code: 'API_P_403',
                message: 'There is not information.'
            });
        }
        return res.status(200).json({
            data,
            code: 'API_P_200',
            message: 'Data to create the graphic.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            message: 'Error in countPostByCategory',
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
    updatePostImage,
    countPostByCategory,
    listAllPosts,
    updateMyPost,
    viewMyPosts,
    listMyPosts,
    deteleMyPost,

}