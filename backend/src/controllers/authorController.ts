import { Request, Response } from "express";
import Author from "../models/author";
import { AuthorType } from "../shared/types";
import removeAccents from "remove-accents"

export const addAuthor = async (req: Request, res: Response) => {
    try {
        const newAuthor: AuthorType = req.body;
        const author = new Author(newAuthor);
        await author.save();
        res.status(201).json(author)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const editAuthor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { name, bio } = req.body;
        const author = await Author.findByIdAndUpdate({
            _id: id
        }, {
            name: name,
            bio: bio
        }, {
            new: true
        })
        if (!author) {
            res.status(404).json({ message: "Author not found!" })
        } else {
            await author.save();
            res.status(200).json(author)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const deleteAuthor = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const author = await Author.findByIdAndDelete({ _id: id })
        if (!author) {
            res.status(404).json({ message: "Athor not found!" })
        } else {
            res.status(200).json({ message: "Delete Successful!" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Errror from server!" })
    }
}
export const fetchAllAuthor = async (req: Request, res: Response) => {
    try {
        const authors = await Author.find({})
        if (!authors) {
            res.status(404).json({ message: "Author not found!" })
        }
        res.status(200).json(authors)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const searchAuthorByName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const authors = await Author.find({
            $or: [
                { name: { $regex: new RegExp(name, "i") } }
            ]
        })
        if (!authors) {
            res.status(404).json({ message: "Author not found!" })
        }
        res.status(200).json(authors)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}