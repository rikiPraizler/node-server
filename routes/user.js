import express from "express";
import * as userController from "../controllers/user.js"
import { authAdmin } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", authAdmin , userController.getAllUsers);
router.post("/", userController.addUser);
router.get("/login", userController.login);

export default router;