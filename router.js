import { userController } from "./controller.js";
import { Router } from "express";
import { verifyToken } from "./verify.js";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/getAllUser", userController.getAllUsers);

router.get("/user/:id", verifyToken, userController.getUserById);

router.put("/user/update/:id", verifyToken, userController.updateUser);

router.delete("/deleteUser/:id", verifyToken, userController.deleteUser);

export default router;
