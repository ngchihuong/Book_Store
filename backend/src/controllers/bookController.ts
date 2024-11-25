import { query, Request, Response } from "express"
import { BookType } from "../shared/types";
import Book from "../models/book";
import { uploadImages } from "../utils/uploadImages";
import { Multer } from "multer";
import { title } from "process";
import Category from "../models/category";

export const addBook = async (req: Request, res: Response) => {
    try {
        const newBook: BookType = req.body;

        const imageFiles = req.files as Express.Multer.File[];

        //upload images to cloudinary
        const imageUrls = await uploadImages(imageFiles);
        newBook.imageUrls = imageUrls;
        // save book in our data

        const book = new Book(newBook);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchAllBook = async (req: Request, res: Response) => {
    try {
        const books = await Book.find({})
            .populate("categoryId", "name")
            .populate("authorId", "name bio")
        if (!books) {
            res.status(404).json({ message: "Books not found!" })
        }
        res.status(200).json(books)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchBookById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const book = await Book.findById({ _id: id })
            .populate("categoryId", "name")
            .populate("authorId", "name bio");
        if (!book) {
            res.status(404).json({ message: "Book not found!" })
        }
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const editBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const updateBook: BookType = req.body;

        const files = req.files as Express.Multer.File[];
        const updateImageFiles = await uploadImages(files);
        updateBook.imageUrls = [...updateImageFiles, ...updateBook.imageUrls || []];
        const book = await Book.findByIdAndUpdate({
            _id: id,
        }, updateBook, {
            new: true
        });
        if (!book) {
            res.status(404).json({ message: "Book not found!" })
        }
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const book = await Book.findOneAndDelete({ _id: id })
        if (!book) {
            res.status(404).json({ message: "Book not found!" })
        }
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const searchBookForAdmin = async (req: Request, res: Response) => {
    try {
        const title = req.params.title;
        const books = await Book.find({
            $or: [
                { title: { $regex: new RegExp(title, "i") } },
            ]
        })
            .populate("categoryId", "name")
            .populate("authorId", "name bio");

        if (!books) {
            res.status(404).json({ message: "Books " })
        }
        res.status(200).json(books)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}

export const fetchBookByCategory = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({});
        const categoriesWithBook = await Promise.all(
            categories.map(async (category) => {
                const books = await Book.find({
                    $and: [
                        { categoryId: category._id },
                        { stock: { $gte: 1 } }
                    ]
                })
                    .populate("categoryId", "name").populate("authorId", "name bio")
                return {
                    ...category.toObject(),
                    books  // add list book to category :v
                };
            })
        );
        res.status(200).json(categoriesWithBook)
    } catch (error) {
        console.error("Error fetching books by category:", error);
        res.status(500).json({ message: "Error from server!" });
    }
};
export const fetchBookByCategoryId = async (req: Request, res: Response) => {
    try {
        const categoryId = req.params.categoryId;
        const books = await Book.find({
            $and: [
                { categoryId: categoryId },
                { stock: { $gte: 1 } }
            ]
        })
            .populate("categoryId", "name").populate("authorId", "name bio");

        if (!books) {
            res.status(404).json({ message: "Categories not found!" })
        }
        res.status(200).json(books)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const searchBookByName = async (req: Request, res: Response) => {
    try {
        const key = req.query.key;
        const page: any = req.query.page;
        const limit: any = req.query.limit;
        const skip = (page - 1) * limit;
        const search = key ? {
            $or: [
                { title: { $regex: key, $options: "i" } },
                { description: { $regex: key, $options: "i" } }
            ]
        } : {}
        const book = await Book.find(search)
            .populate("categoryId", "name").populate("authorId", "name bio")
            .skip(skip).limit(limit)
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}