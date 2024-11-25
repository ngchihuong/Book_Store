import mongoose from "mongoose";
import { CategoryType } from "../shared/types";

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
})

const Category = mongoose.model<CategoryType>("Category", categorySchema);
export default Category;