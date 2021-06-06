'use strict';

const newRG = { new: true };
const { currentDate } = require('../../Helpers/Dating/dating')
var { PostModel } = require('../../models/index');

async function createPost(req, res) {
    try {
        const params = req.body;
        const post = new PostModel({
            ...params,
            subscriberId : params._id
        });

        const data = await post.save();
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
        const params = req.body;
        const setUpdateBy = { _id: req.params._id };
        const setUpdate = {
            TitlePost: params.TitlePost,
            Precio: params.Precio,
            DescripcionPost: params.DescripcionPost,
            fecha_modificacion: await currentDate()
        }
        const data = await PostModel.findByIdAndUpdate(setUpdateBy, setUpdate, newRG);

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
        const params = req.body;
        const _id = { _id: params._id };
        const setUpdate = { Images: params.img };
        const data = await PostModel.findByIdAndUpdate(_id, setUpdate, newRG).exec();

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
        const idSub = {
            subscriberId: req.suscriber._id }
        const data = await PostModel.find(idSub).populate('subscriberId').exec();
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
        const body = req.body;
        const page = body.currentPage <= 0 ? 1 : body.currentPage;
        const data = await PostModel.aggregate([{
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
        const setFind = { _id: req.query._id };
        const data = await PostModel.findOne(setFind).exec();
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
        const setDelete = { _id: req.params._id };
        const data = await PostModel.findByIdAndDelete(setDelete).exec();
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
        const data = await PostModel.aggregate([
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