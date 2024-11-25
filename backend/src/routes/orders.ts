import express from "express"
import verifyToken from "../middleware/auth";
import authRoles from "../middleware/authRoles";
import { fetchAllOrderPending, insertOrder } from "../controllers/orderController";

const router = express.Router();

//api/authors/....
router.post("/create", verifyToken, insertOrder);
router.get("/order-pending",fetchAllOrderPending)
export default router;