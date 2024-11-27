import express from "express"
import verifyToken from "../middleware/auth";
import authRoles from "../middleware/authRoles";
import { deleteOrder, fetchAllOrderCanceled, fetchAllOrderDelivered, fetchAllOrderDeliveredForUser, fetchAllOrderPending, fetchAllOrderPendingForUser, fetchAllOrders, fetchAllOrderTransiting, fetchAllOrderTransitingForUser, fetchOrderById, insertOrder, updateStatusPendingToCanceled, updateStatusPendingToTransit, updateStatusTransitToDelivered } from "../controllers/orderController";

const router = express.Router();

//api/authors/....
router.post("/create", verifyToken, insertOrder);
router.get("/order-pending",fetchAllOrderPending)
router.get("/order-transit",fetchAllOrderTransiting)
router.get("/order-delivered",fetchAllOrderDelivered)
router.get("/order-canceled",fetchAllOrderCanceled)
router.get("/order/:id",fetchOrderById)
router.get("/orders", fetchAllOrders)

router.get("/user-order-pending",verifyToken,fetchAllOrderPendingForUser)
router.get("/user-order-intransit",verifyToken,fetchAllOrderTransitingForUser)
router.get("/user-order-delivered",verifyToken,fetchAllOrderDeliveredForUser)

router.put("/orderPendingToTransit/:id", verifyToken, authRoles(["admin"]),updateStatusPendingToTransit)
router.put("/orderTransitToDelivered/:id", verifyToken,updateStatusTransitToDelivered)
router.put("/orderPendingToCanceled/:id", verifyToken,updateStatusPendingToCanceled)
router.delete("/delete/:id", verifyToken,deleteOrder)

export default router;