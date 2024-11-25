import { Request, Response } from "express"
import { validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"


//users
export const registerController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() })
    }

    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            res.status(400).json({ message: "User already exists!" })
        } else {
            user = new User(req.body);
            await user.save();

            const token = jwt.sign({ userId: user.id },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: process.env.JWT_EXPIRE as string
                }
            )
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 86400000
            })
            res.status(201).json({ message: "User registered is OK!" });
        }
    } catch (error) {
        console.log(error);
        res.json({ message: "Error from server!" })
    }
}
export const loginController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ message: errors.array() })
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "Invalid Credentials" });
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(401).json({ message: "Invalid Credentials!" })
            } else {
                const token = jwt.sign({ userId: user.id, role: user.role },
                    process.env.JWT_SECRET_KEY as string,
                    {
                        expiresIn: process.env.JWT_EXPIRE as string,
                    }
                )
                res.cookie("auth_token", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 86400000
                })
                res.status(200).json({
                    user: user,
                    role: user.role,
                    userId: token
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const logOutController = async (req: Request, res: Response) => {
    try {
        res.cookie("auth_token", "", {
            expires: new Date(0)
        })
        res.status(200).json({ message: "Log-out Successed!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erorr from server!" })
    }
}
export const validateToken = async (req: Request, res: Response) => {
    try {
        res.status(200).json({ userId: req.userId })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchCurrentUserController = async (req: Request, res: Response) => {
    try {
        const id = req.userId.toString();
        const user = await User.findById({ _id: id }).select("-password");
        if (!user) {
            res.status(404).json({ message: "User Not Found!" })
        }
        res.status(200).json(user)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}

//admin...

export const authRolesController = (req: Request, res: Response) => {
    try {
        res.status(200).json({ message: "Admin" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const fetchAllAccountController = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const users = await User.find({ userId: userId });
        if (!users) {
            res.status(404).json({ message: "Users not found!" })
        }
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}
export const searchUserController = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        let query: any = {};

        let nameParts = name.split(' ');
        if (nameParts.length === 1) {
            query = {
                $or: [
                    { firstName: { $regex: new RegExp(nameParts[0], 'i') } },
                    { lastName: { $regex: new RegExp(nameParts[0], 'i') } }
                ]
            }
        } else {
            const firstName = nameParts[0];
            const lastName = nameParts[nameParts.length - 1];
            query = {
                $and: [
                    { firstName: { $regex: new RegExp(firstName, 'i') } },
                    { lastName: { $regex: new RegExp(lastName, 'i') } }
                ]
            }
        }

        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error from server!" })
    }
}