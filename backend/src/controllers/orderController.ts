import { Request, Response } from "express"
import Book from "../models/book";
import Order from "../models/order";
import OrderDetail from "../models/orderdetail";

export const insertOrder = async (req: Request, res: Response) => {
    const userId = req.userId.toString();
    const { totalPrice, totalAmout, shippingAddress, order_details } = req.body;
    try {
        for (let i = 0; i < order_details.length; i++) {
            const product = await Book.findById(order_details[i].bookId);
            if (!product || product.stock < order_details[i].quantity) {
                res.status(400).json({
                    message: `Not enough stock for book: ${product?.title}`,
                });
            }
        }

        const orderDetailPromises = order_details.map(async (item: any) => {
            const product = await Book.findById(item.bookId);

            // Tạo chi tiết đơn hàng
            const orderDetail = new OrderDetail({
                orderId: null, // Chưa có ID đơn hàng, sẽ cập nhật sau
                bookId: item.bookId,
                quantity: item.quantity,
                price: product?.price
            });
            return orderDetail.save();
        });

        const orderDetails = await Promise.all(orderDetailPromises);

        const newOrder = new Order({
            userId,
            totalAmout: totalAmout,
            totalPrice: totalPrice,
            shippingAddress: shippingAddress,
            status: "pending",
        });

        const savedOrder = await newOrder.save();

        for (let i = 0; i < order_details.length; i++) {
            const product = await Book.findById(order_details[i].bookId);

            // Trừ bớt số lượng trong kho
            if (product) {
                product.stock -= order_details[i].quantity;
                await product.save();
            }
        }

        await OrderDetail.updateMany(
            { _id: { $in: orderDetails.map(detail => detail._id) } },
            { $set: { orderId: savedOrder._id } }
        );
        res.status(201).json({ message: 'Order created successfully', savedOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchAllOrderPending = async (req: Request, res: Response) => {
    try {
        const orderPending = await Order.find({ status: "pending" })
            .populate("userId", "firstName lastName email phoneNumber")
        // const orderDetails = orderPending?.map(async (order) => {
        //     const id = order.id.toString();
        //     const orderDetail = await OrderDetail.find({ orderId: id })
        //         .populate("bookId", "title imageUrls price")
        //     return {
        //         order,
        //         detail: {
        //             orderDetail
        //         }
        //     }
        // })

        const orderIds = orderPending.map((order) => order.id);

        const orderDetails = await OrderDetail.find({
            orderId: { $in: orderIds }
        }).populate("bookId", "title price")

        const result = orderPending.map((order) => {
            const details = orderDetails.filter(
                (detail) => detail.orderId.toString() === order._id.toString()
            );
            return {
                ...order.toObject(),
                orderDetails: details,
            }
        })
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}

