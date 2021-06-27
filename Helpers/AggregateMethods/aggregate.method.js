

module.exports = {
    listingPosts: async (params, page) => {
        const query = [{
            $facet: {
                pageInfo: [
                    { $group: { _id: null, count: { $sum: 1 } } }
                ],
                dataInfo: [
                    {
                        $skip: (parseInt(page) - 1) * parseInt(params.postsLimit)
                    },
                    {
                        $limit: parseInt(params.postsLimit)
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
        }]
        return query;
    },
    amoutsOfPost: async () => {
        const query = [
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: 1
                    },
                    category: {
                        $first: "$category"
                    }
                }
            },
            {
                $project: {
                    name_cat: "$_id",
                    total: 1,
                    _id: 0
                }
            }
        ]
        return query;
    },
    amoutsOfPostBetweenDates: async (params) => {
        const query = [{
            $match: {
                createDate: {
                    $gte: new Date(params.startDate),
                    $lte: new Date(params.endDate)
                }
            }
        },
        {
            $group: {
                _id: "$category",
                total: {
                    $sum: 1
                },
                category: {
                    $first: "$category"
                }
            }
        },
        {
            $project: {
                name_cat: "$_id",
                total: 1,
                _id: 0
            }
        }]
        return query;
    },
    amountsOfPostsBetweenPrices: async (params) => {
        const query = [{
            $match: {
                price: {
                    $gte: parseInt(params.highPrices),
                    $lte: parseInt(params.lowPrice)
                }
            }
        },
        {
            $group: {
                _id: "$price",
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
                price: "$_id",
                total: 1,
                price: 1,
                _id: 0
            }
        }]
        return query;
    }
}