// businessInformation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  discount: { type: Number, default: 0 },
});

const businessInformationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  paymentPolicy: { type: String, required: true },
  shippingPolicy: { type: String, required: true },
  returnPolicy: { type: String, required: true },
  storeDescription: { type: String, required: true },
  targetAudience: { type: String, required: true },
  customerQueries: { type: String, required: true },
  products: [productSchema],
});

const BusinessInformation = mongoose.model('BusinessInformation', businessInformationSchema);
module.exports = BusinessInformation;