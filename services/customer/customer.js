/**
 * This is for Contain function layer for contractor service.
 * @author Sandip Vaghasiya
 *
 */

const ObjectId = require("mongodb").ObjectID;
import dbService from "../../utilities/dbService";
import {
  encryptpassword,
  decryptPassword,
  generateJwtTokenFn,
} from "../../utilities/universal";

/*************************** addContractor ***************************/
export const addCustomer = async (req) => {

  // Parse hours and minutes separately
  const hoursMinutesArray = req.body.totalHours.split('.');
  const hours = parseInt(hoursMinutesArray[0]); // Hours
  const minutes = parseInt(hoursMinutesArray[1] || 0); // Minutes, default to 0 if not provided

  const totalHours = hours + minutes / 60;

  const priceHours = parseFloat(req.body.priceHours);

  if (isNaN(totalHours) || isNaN(priceHours)) {
    console.log("Invalid totalHours or priceHours");
    return;
  }

  let countTotalprice = totalHours * priceHours;

  let AddcustomerData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    surName: req.body.surName,
    phone: req.body.phone,
    toolName: req.body.toolName,
    totalHours: req.body.totalHours,
    priceHours: priceHours,
    totalPrice: countTotalprice
  };

  if (AddcustomerData) {
    let AddData = await dbService.createOneRecord("customerModel", AddcustomerData);
    return {
      message: "Customer Detail Add"
    }
  }
  else {
    throw new Error("Customer Detaile NOt Add");
  }
};


/*************************** getSingleCustomer ***************************/
export const getSingleCustomer = async (req) => {
  try {
    console.log("getSingleCustomer", req.body);

    // Construct the where clause based on the provided phone number
    let where = {
      isDeleted: false,
      phone: req.body.phone
    };

    // Retrieve the single customer data based on the constructed where clause
    let singlecustomerData = await dbService.findRecordWithFilterFn("customerModel", where);

    if (singlecustomerData) {
      return {
        message: "customersingle data get!",
        data: singlecustomerData
      };
    }
    else {
      throw new Error("customersingle data not get!");
    }

  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in getSingleCustomer:", error);
    throw error; // Propagate the error to the caller
  }
};


/*************************** addPayment ***************************/
export const addPayment = async (req) => {
  console.log("addPayment--->",req.body);

  let Data ={
    firstName:req.body. firstName,
    lastName:req.body.lastName,
    surName:req.body.surName,
    phone:req.body.phone,
    price:req.body.price,
  }

  if(Data){
    let AddData = await dbService.createOneRecord("paymentModel", Data);

    return{
      message:"data insert"
    }
  }else{
    console.error("Error in payment add:", error);
  }

  
}

export const onLogin = async (req, res, next) => {
  const payload = req.body;
  console.log("payload==>", payload);
  let userData = await dbService.findOneRecord("contractorModel", {
    email: payload.email.toLowerCase(),
    isDeleted: false,
  });
  console.log("userData==>", userData);
  if (!userData) throw new Error("Email not exists");

  let match = await (payload.password, userData.password);
  if (!match) throw new Error("Password Invalid");
  if (userData.isMailVerified == false) throw new Error("Please verify email");

  if (userData?.loginToken) {
    if (userData?.loginToken?.length >= 5) {
      let rr = await dbService.findOneAndUpdateRecord(
        "contractorModel",
        { _id: userData._id },
        {
          $pop: { loginToken: -1 },
        },
        { new: true }
      );
    }
  }

  let token = await generateJwtTokenFn({ userId: userData._id });
  let updateData = {
    $push: {
      loginToken: {
        token: token,
      },
    },
    lastLoginDate: Date.now(),
  };

  let data = await dbService.findOneAndUpdateRecord(
    "contractorModel",
    { _id: userData._id },
    updateData,
    { new: true }
  );

  // res.setHeader("Access-Control-Expose-Headers", "token");
  // res.setHeader("token", data.loginToken[data.loginToken.length - 1].token);

  return {
    email: data.email,
    lastLogin: data.lastLoginDate,
    token: token,
  };
};

/*************************** addContractor ***************************/
export const getCustomer = async (entry) => {

  let where = {
    isDeleted: false,
  }

  let customerData = await dbService.findAllRecords("customerModel", {
    where,
  });

  if (customerData) {
    return {
      message: "data get costumer",
      data: customerData
    }
  }

};

/*************************** get payment data ***************************/
export const paymentdatagetFn = async (req) => {
  let phoneNumber = req.body.phone;
  console.log("phoneNumber", phoneNumber);

  if (phoneNumber) {
    let where = {
      isDeleted: false,
      phone: phoneNumber // Corrected: Use phoneNumber here instead of req.body.phone
    };

    let singlecustomerpayment = await dbService.findRecordWithFilterFn("paymentModel", where);

    if (singlecustomerpayment) {
      return {
        message: "customersingle data get!",
        data: singlecustomerpayment
      };
    } else {
      throw new Error("customersingle data not get!");
    }
  } else {
    let where = {
      isDeleted: false,
    };

    let customerpaymentData = await dbService.findAllRecords("paymentModel", {
      where,
    });

    if (customerpaymentData) {
      return {
        message: "data get costumer",
        data: customerpaymentData
      };
    }
  }
};
