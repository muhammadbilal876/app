import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    date: String,
    orderNumber: String,
    trackingNumber: String,
    status: String,
    totalAmount: Number,
    items: [
      {
        quantity: Number,
        productImage: String,
        productColor: String,
        productSize: String,
        productTitle: String,
        productPrice: Number,
      },
    ],
  });
  
export const Order = mongoose.model('Order', orderSchema);