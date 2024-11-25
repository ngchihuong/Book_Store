import express from "express"
import verifyToken from "../middleware/auth";
import authRoles from "../middleware/authRoles";
import { addAuthor, deleteAuthor, editAuthor, fetchAllAuthor, searchAuthorByName } from "../controllers/authorController";

const router = express.Router();

//api/authors/....
router.post("/add-author", verifyToken, authRoles(["admin"]), addAuthor)
router.put("/edit-author/:id", verifyToken, authRoles(["admin"]), editAuthor)
router.delete("/delete-author/:id", verifyToken, authRoles(["admin"]), deleteAuthor)
router.get("/authors", verifyToken, authRoles(['admin']), fetchAllAuthor)
router.get("/search/:name", verifyToken, authRoles(["admin"]), searchAuthorByName)
export default router;