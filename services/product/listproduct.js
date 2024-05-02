/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
import dbService from "../../utilities/dbService";
import { paginationFn } from "../../utilities/pagination";
import collections from '../../collections';



/*************************** addContractor ***************************/

/********* 1. Normal With Pagination ***********/

export const getProduct = async (req) => {
  const { page = 1, limit = 0 } = req.body;
  const { userId, _id } = req.user;

  let skip = page * limit - limit;

  req.body.mainUserId = userId;
  req.body.createdBy = _id;
  let count = await dbService.recordsCount("productModel",
    {
      mainUserId: userId,
      isDeleted: false,
    });

  let productData = await dbService.findManyRecordsWithPagination("productModel",
    {
      mainUserId: userId,
      isDeleted: false,
    },
    {
      skip: skip,
      limit: limit,
    });

  return { productData, count: count };
};

/********* 2. aggregate with pagination ***********/

export const listProductWithAggregation = async (req) => {
  console.log("listProductWithAggregation");
  const { page = 1, limit = 0 } = req.body;
  const { userId, _id } = req.user;

  // let skip = page * limit - limit;
  const { docLimit, noOfDocSkip } = paginationFn({ page, limit });

  let mainUserId = ObjectId(req.user.userId);

  let count = await dbService.recordsCount("productModel",
    {
      mainUserId: userId,
      isDeleted: false,
    });

  let filter = {
    mainUserId: ObjectId(userId),
    isDeleted: false,
  }
  let sortBy = { productName: 1 };
  let aggregateQuery = [
    { $match: filter },
    { $sort: sortBy },
    { $skip: noOfDocSkip },
    { $limit: docLimit },
    {
      $lookup: {
        from: "customers",
        let: { mainUserId: "$_id" },
        pipeline: [
          {
            $match: {
              isDeleted: false,
              _id: mainUserId,
            },
          },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              email: 1,
            },
          },
        ],
        as: "User"
      },
    },
    {
      $unwind: { path: "$User" }
    },
  ];

  let productData = await dbService.aggregateData("productModel", aggregateQuery
    // [
    //   {
    //     $lookup:
    //     {
    //       from: "customers",
    //       localField: "mainUserId",
    //       foreignField: "_id",
    //       as: "custData"
    //     }
    //   },
    //   {
    //     $unwind: "$custData"
    //   },
    //   /* {
    //     $project: {
    //       "custData.firstName":1,
    //       "custData.lastName":1,
    //     }
    //   }, */
    //   {
    //     $skip: skip
    //   },
    //   {
    //     $limit: 3
    //   },
    // ]
  );

  return {
    items: productData,
    count: count,
  };
};

/********* 3. facet with pagination ***********/

export const listProductWithAggregationWithfacet = async (req) => {
  console.log("listProductWithAggregationWithfacet");
  let { page = 1, limit = 0 } = req.body;
  const { userId, _id } = req.user;
  const { docLimit, noOfDocSkip } = paginationFn({ page, limit });

  // let skip = page * limit - limit;

  req.body.mainUserId = userId;
  req.body.createdBy = _id;
  let mainUserId = ObjectId(req.user.userId);
  let sortBy = { productName: 1 };

  let filter = {
    mainUserId: ObjectId(userId),
    isDeleted: false,
  }

  let aggregateQuery = [
    { $match: filter },

    {
      $lookup: {
        from: "customers",
        let: { mainUserId: "$_id" },
        pipeline: [
          {
            $match: {
              isDeleted: false,
              _id: mainUserId,
            },
          },

          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              email: 1,
            },
          },
        ],
        as: "User",
      },
    },
    {
      $unwind: { path: "$User", preserveNullAndEmptyArrays: true },
    },
    {
      $facet: {
        data: [{ $sort: sortBy }, { $skip: noOfDocSkip }, { $limit: docLimit }],
        pageInfo: [
          {
            $group: { _id: null, count: { $sum: 1 } },
          },
        ],
      },
    },
    {
      $unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
    },
    {
      $project: {
        items: "$data",
        pageInfo: {
          page: page,
          limit: limit,
          count: "$pageInfo.count",
        },
      },
    },
  ];

  let productData = await dbService.aggregateData("productModel", aggregateQuery);

  return {
    items: productData[0].items,
    page: page,
    limit: limit,
    count: productData[0].pageInfo.count,
  };
};

export const listProductWithPopulate = async (req) => {

  let { page = 1, limit = 0 } = req.body;
  let filter = {
    mainUserId: ObjectId(req.user.userId),
    isDeleted: false,
  };

  let sortBy = { productName: 1 };

  // return await dbService.findManyRecordsWithPaginationAndPopulate(
  //   "productModel",
  //   filter,
  //   { sort: sortBy, page, limit },
  //   {},
  //   [
  //     {
  //       path: "mainUserId",
  //       select: ["_id", "firstName", "lastName", "email"],
  //     },
  //   ]
  // );

  return await collections['productModel'].find(filter).sort(sortBy).skip(page).limit(limit).populate([
    {
      path: "mainUserId",
      select: ["_id", "firstName", "lastName", "email"],
    },
  ]);
};