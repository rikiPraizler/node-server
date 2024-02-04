import express from "express";
import * as orderController from "../controllers/order.js";
import { authAdmin, auth } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", authAdmin, orderController.getAllOrders);
router.delete("/:id", auth || authAdmin, orderController.deleteOrder);
router.put("/:id", authAdmin, orderController.updateOrder);
router.get("/getUserOrders", auth, orderController.getOrdersByUser);
router.post("/", auth, orderController.addOrder);

export default router;