import express, { Request, Response } from "express";
import { CategoryType } from "../shared/types";
import Category from "../models/category";

export const addCategory = async (req: Request, res: Response) => {
    try {
        const newCate: CategoryType = req.body;
        const category = new Category(newCate);
        await category.save();
        res.status(201).json(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const editCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { name } = req.body
        const category = await Category.findByIdAndUpdate({
            _id: id
        }, {
            name: name
        }, {
            new: true
        })

        if (!category) {
            res.status(404).json({ message: "Category not found!" })
        }
        res.status(200).json(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const category = await Category.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Delete Successful!" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchAllCategory = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({})
        if (!categories) {
            res.status(404).json({ message: "Categories not found!" })
        }
        res.status(200).json(categories)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchCategoryById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const category = await Category.findById({ _id: id })
        if (!category) {
            res.status(404).json({ message: "Categories not found!" })
        }
        res.status(200).json(category)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}