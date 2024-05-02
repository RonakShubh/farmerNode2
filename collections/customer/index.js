/**
 * This is the indexer for contractor model
 * @author Sandip Vaghasiya
 * @since Saturday, May 28, 2022
 */
 import mongoose from 'mongoose';
 const customerSchema = new mongoose.Schema({
     firstName: { type: String },
     lastName: { type: String },
     surName: {type: String },
     toolName: { type: String },
     totalHours: { type: String },
     priceHours: { type: String },
     totalPrice: { type: String },
     companyName: { type: String },
     phone: { type: String },
     price: { type: String },
     email: { type: String },
     password: { type: String },
     loginToken: [
         {
             token: {
                 type: String,
             },
         },
     ],
     isEnabled: { type: Boolean, default: true },
     isDeleted: { type: Boolean, default: false },
     lastLoginDate: {type: Number},
     deletedAt: Number,
     isUpdated: Boolean,
     isMailVerified: { type: Boolean, default: false },
     createdAt: { type: Date, default:  Date()},
     updatedAt: { type: Date, default:  Date()}
 });

export default mongoose.model("customer", customerSchema);
