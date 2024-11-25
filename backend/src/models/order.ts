import mongoose, { Schema } from "mongoose";
import { OrderType } from "../shared/types";


const orderSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    totalPrice: { type: Number, required: true },
    totalAmout: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "in_transit", "delivered", "canceled"]
    }
})
const Order = mongoose.model<OrderType>("Order", orderSchema);
export default Order;