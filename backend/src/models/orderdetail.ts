import mongoose, { Schema } from "mongoose";
import { OrderDetailType } from "../shared/types";

const orderDetailSchema = new mongoose.Schema({
    orderId: { type: Schema.Types.ObjectId, ref: "Order", requried: true },
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
})

const OrderDetail = mongoose.model<OrderDetailType>("OrderDetail", orderDetailSchema);
export default OrderDetail;