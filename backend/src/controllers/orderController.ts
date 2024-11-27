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

export const fetchAllOrderTransiting = async (req: Request, res: Response) => {
    try {
        const orderPending = await Order.find({ status: "in_transit" })
            .populate("userId", "firstName lastName email phoneNumber")

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
export const fetchAllOrderDelivered = async (req: Request, res: Response) => {
    try {
        const orderPending = await Order.find({ status: "delivered" })
            .populate("userId", "firstName lastName email phoneNumber")

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
export const fetchAllOrderCanceled = async (req: Request, res: Response) => {
    try {
        const orderPending = await Order.find({ status: "canceled" })
            .populate("userId", "firstName lastName email phoneNumber")

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
export const fetchAllOrders = async (req: Request, res: Response) => {
    try {
        const orderPending = await Order.find({})
            .populate("userId", "firstName lastName email phoneNumber")

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
export const fetchOrderById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const order = await Order.findById({ _id: id }).populate("userId", "firstName lastName email phoneNumber")
        if (!order) {
            res.status(404).json({ message: "Order not found!" })
        }
        const orderIds = order?.id;

        const orderDetails = await OrderDetail.find({
            orderId: { $in: orderIds }
        }).populate("bookId", "title price")

        const result = {
            ...order?.toObject(),
            orderDetails
        }

        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}

export const fetchAllOrderPendingForUser = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const orderPending = await Order.find({
            $and: [
                { status: { $in: "pending" } },
                { userId: { $in: userId } }
            ]
        })
            .populate("userId", "firstName lastName email phoneNumber")
        console.log(orderPending);

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
        // console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchAllOrderTransitingForUser = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const orderPending = await Order.find({
            $and: [
                { status: { $in: "in_transit" } },
                { userId: { $in: userId } }
            ]
        })
            .populate("userId", "firstName lastName email phoneNumber")
        console.log(orderPending);

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
        // console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchAllOrderDeliveredForUser = async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
        const orderPending = await Order.find({
            $and: [
                { status: { $in: "delivered" } },
                { userId: { $in: userId } }
            ]
        })
            .populate("userId", "firstName lastName email phoneNumber")
        console.log(orderPending);

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
        // console.log(result);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}

export const updateStatusPendingToTransit = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orderUpdate = await Order.findByIdAndUpdate({
            _id: id,
        }, {
            status: "in_transit"
        }, {
            new: true
        })
        console.log(orderUpdate);
        if (!orderUpdate) {
            res.status(404).json({ message: "Order Not Found!" })
        }
        res.status(200).json(orderUpdate)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const updateStatusTransitToDelivered = async (req: Request, res: Response) => {
    const id = req.params.id;
    const userId = req.userId;
    try {
        const orderUpdate = await Order.findByIdAndUpdate({
            _id: id
        }, {
            status: "delivered"
        }, {
            new: true
        })
        if (!orderUpdate) {
            res.status(404).json({ message: "Order Not Found!" })
        }
        res.status(200).json(orderUpdate)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const updateStatusPendingToCanceled = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orderUpdate = await Order.findByIdAndUpdate({
            _id: id,
        }, {
            status: "canceled"
        }, {
            new: true
        })
        if (!orderUpdate) {
            res.status(404).json({ message: "Order Not Found!" })
        }
        res.status(200).json(orderUpdate)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const deleteOrder = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const orderDelete = await Order.findByIdAndDelete({ _id: id })
        if (!orderDelete) {
            res.status(404).json({ message: "Order Not Found!" })
        }
        res.status(200).json({ message: "Delete Successful!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
