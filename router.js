import { userController } from "./controller.js";
import { Router } from "express";
import { verifyToken } from "./verify.js";

const router = Router();

router.post("/api/register", userController.register);

router.post("/api/login", userController.login);

router.get("/api/getAllUser", userController.getAllUsers);

router.get("/api/user/:id", verifyToken, userController.getUserById);

router.put("/api/user/update/:id", verifyToken, userController.updateUser);

router.delete("/api/deleteUser/:id", verifyToken, userController.deleteUser);

export default router;
