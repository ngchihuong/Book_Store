import mongoose from "mongoose";

export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role:
    {
        role1: "admin",
        role2: "users",
    }
}

export type AuthorType = {
    _id: string;
    name: string;
    bio: string;
}

export type CategoryType = {
    _id: string;
    name: string;
}

export type BookType = {
    _id: string;
    title: string;
    categoryId: mongoose.Schema.Types.ObjectId;
    authorId: mongoose.Schema.Types.ObjectId;
    price: number;
    description: string;
    stock: number;
    imageUrls: string[];
}
export type OrderType = {
    _id: string;
    userId: mongoose.Schema.Types.ObjectId;
    totalAmount: number;
    totalPrice: number;
    shippingAddress: string;
    status: "pending" | "in_transit" | "delivered" | "cancelled"
}
export type OrderDetailType = {
    _id: string;
    orderId: mongoose.Schema.Types.ObjectId;
    bookId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
}

