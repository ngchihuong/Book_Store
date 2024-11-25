import express from "express"
import verifyToken from "../middleware/auth";
import authRoles from "../middleware/authRoles";
import { addBook, deleteBook, editBook, fetchAllBook, fetchBookByCategory, fetchBookByCategoryId, fetchBookById, searchBookByName, searchBookForAdmin } from "../controllers/bookController";
import multer from "multer";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    }
})
//api/authors/....
router.post("/add", verifyToken, authRoles(["admin"]),
    [
        body("title").notEmpty().withMessage("Title is reuqired!"),
        body("categoryId").notEmpty().withMessage("Category is required!"),
        body("authorId").notEmpty().withMessage("Author is required!"),
        body("price").notEmpty().isArray().withMessage("Price is required and must be a number!"),
        body("description").notEmpty().withMessage("Description is required!"),
        body("stock").notEmpty().isArray().withMessage("Quantity is required and must be a number!"),
    ],
    upload.array("imageFiles", 4),
    addBook);
router.get("/books", fetchAllBook);
router.put("/edit/:id", verifyToken, authRoles(["admin"]), upload.array("imageFiles", 4), editBook)
router.delete("/delete/:id", verifyToken, authRoles(["admin"]), deleteBook)
router.get("/book/:id", fetchBookById)
router.get("/search/:title", searchBookForAdmin);

router.get("/categories-with-books", fetchBookByCategory)
router.get("/book/category/:categoryId", fetchBookByCategoryId)
router.get("/search", searchBookByName)
export default router;