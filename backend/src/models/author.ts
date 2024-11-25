import mongoose from "mongoose";
import { AuthorType } from "../shared/types";

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String, required: true },
})

const Author = mongoose.model<AuthorType>("Author", authorSchema);
export default Author;