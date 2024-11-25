import express from "express"
import verifyToken from "../middleware/auth";
import authRoles from "../middleware/authRoles";
import { addCategory, deleteCategory, editCategory, fetchAllCategory, fetchCategoryById } from "../controllers/categoryController";

const router = express.Router();

//api/authors/....
router.post("/add-category", verifyToken, authRoles(["admin"]), addCategory);
router.put("/edit-category/:id", verifyToken, authRoles(["admin"]), editCategory)
router.delete("/delete-category/:id", verifyToken, authRoles(["admin"]), deleteCategory)

router.get("/categories", fetchAllCategory)
router.get("/category/:id", fetchCategoryById)
export default router;