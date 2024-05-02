import dbService from "../../utilities/dbService";
const ObjectId = require("mongodb").ObjectID;

import collections from "../../collections";

export const getProduct = async (req) => {
    let { page = 1, limit = 0 } = req.body;
    let skip = page * limit - limit;
    const { userId, _id } = req.user;
    let filter = {
        mainUserId: ObjectId(userId),
        isDeleted: false,
    }

    let count = await dbService.recordsCount('productModel',
        filter
    );

    let productData = await dbService.findManyRecordsWithPagination('productModel',
        filter,
        {
            sort: { productName: 1 }, skip: skip, limit: limit,
        }
    );

    return {
        items: productData,
        count: count,
    };
}

export const listProductWithAggregation = async (req) => {
    let { page = 1, limit = 0 } = req.body;
    let skip = page * limit - limit;
    const { userId, _id } = req.user;

    let filter = {
        mainUserId: ObjectId(userId),
        isDeleted: false,
    }
    let count = await dbService.recordsCount('productModel',
        filter
    );

    let sortBy = { productName: 1 };

    let aggregateQuery = [
        {
            $match: filter
        },
        { $sort: sortBy },
        {
            $lookup: {
                from: "customers",
                localField: "mainUserId",
                foreignField: "_id",
                pipeline: [
                    {
                        $match: {
                            isDeleted: false
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                        }
                    }
                ],
                as: "user",
            }
        },
        {
            $unwind: "$user",
        },
        { $skip: skip },
        { $limit: parseInt(limit) },
    ];

    console.log("aggregateQuery---->", aggregateQuery)

    let productData = await dbService.aggregateData('productModel', aggregateQuery);

    return {
        items: productData,
        count: count,
    };
}

export const listProductWithAggregationWithfacet = async (req) => {
    let { page = 1, limit = 0 } = req.body;
    let skip = page * limit - limit;
    const { userId, _id } = req.user;

    let filter = {
        mainUserId: ObjectId(userId),
        isDeleted: false,
    }

    let sortBy = { productName: 1 };

    let aggregateQuery = [
        {
            $match: filter
        },
        { $sort: sortBy },
        {
            $lookup: {
                from: "customers",
                localField: "mainUserId",
                foreignField: "_id",
                pipeline: [
                    {
                        $match: {
                            isDeleted: false
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            firstName: 1,
                            lastName: 1,
                            email: 1,
                        }
                    }
                ],
                as: "user",
            }
        },
        {
            $unwind: "$user",
        },
        {
            $facet: {
                data: [{ $sort: sortBy }, { $skip: skip }, { $limit: parseInt(limit) }],
                pageInfo: [
                    {
                        $group: { _id: null, count: { $sum: 1 } },
                    },
                ]
            }
        },
        {
            $unwind: { path: "$pageInfo" }
        },
        {
            $project: {
                items: "$data",
                pageInfo: {
                    count: "$pageInfo.count",
                }
            }
        },
    ];

    console.log("aggregateQuery---->", aggregateQuery)

    let productData = await dbService.aggregateData('productModel', aggregateQuery);

    return {
        items: productData[0].items,
        page: page,
        limit: limit,
        count: productData[0].pageInfo.count
    };
}

export const listProductWithPopulate = async (req) => {
    // console.log("listProductWithPopulate");
    let { page = 1, limit = 0 } = req.body;
    let skip = page * limit - limit;
    const { userId, _id } = req.user;

    let filter = {
        mainUserId: ObjectId(userId),
        isDeleted: false,
    }

    let sortBy = { productName: 1 };

    let productData = await collections['productModel'].find(filter).sort(sortBy).skip(skip).limit(limit).populate(
        [{
            path: "mainUserId",
            select: ["_id", "firstName", "lastName", "email"],
        }]
    );

    return {
        items: productData,
        count: await collections['productModel'].count(filter),
        page: page,
        limit: limit,
    };
}
