import mongoose, { Schema } from "mongoose";
import { BookType } from "../shared/types";


const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    imageUrls: [{ type: String, required: true }],
})

const Book = mongoose.model<BookType>("Book", bookSchema);
export default Book;