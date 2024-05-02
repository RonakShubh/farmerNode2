/**
 * This is the indexer for contractor model
 * @author Sandip Vaghasiya
 * @since Saturday, May 28, 2022
 */

import mongoose from "mongoose";

const contractorSchema = new mongoose.Schema({
  productName: { type: String },
  productSKU: { type: String },
  productType: { type: String },
  companyName: { type: String },
  procuctPrice: { type: Number },
  mainUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'customer' },
  isEnabled: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Number },
  isUpdated:  { type: Boolean, default: false },
  createdAt: { type: Date },
  updatedAt: { type: Date }
});
export default mongoose.model("product", contractorSchema);