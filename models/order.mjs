import mongoose from 'mongoose'; 

import { Schema } from 'mongoose';

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  }
}
)

const Order = mongoose.model('order', orderSchema);

export default Order;


