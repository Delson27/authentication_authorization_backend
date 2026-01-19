import express from "express";
const router = express.Router();

import {
  loginUser,
  registerUser,
  changePassword,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

//all routes are related to authentication and authorization will be here

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", authMiddleware, changePassword);

export default router;
