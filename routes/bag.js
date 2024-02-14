import express from "express";
import * as bagController from '../controllers/bag.js';
import { authAdmin } from "../middlewares/auth.js";


const router = express.Router();

router.get("/", bagController.getAllBags);
router.get("/:id", bagController.getBagByCode);
router.post("/", authAdmin, bagController.addBag);
router.delete("/:id", authAdmin, bagController.deleteBag);
router.put("/:id", authAdmin, bagController.updateBag);
router.get("/num/page", bagController.getNumPages);


export default router;
