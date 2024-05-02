/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
import dbService from "../../utilities/dbService";


/*************************** addContractor ***************************/
export const addProduct = async (req) => {
  const { productName } = req.body;
  const { userId , _id} = req.user;

  req.body.mainUserId = userId;
  req.body.createdBy = _id;

  let productData = await dbService.findOneRecord("productModel", { 
    productName: productName,
    mainUserId: userId,
   });
  if (productData) {
    throw new Error("product Already Exists!");
  } else {
    let project = await dbService.createOneRecord("productModel", req.body);
    return project;
  }
};