import express from "express";
import authMiddleWare from "../middleware/auth.middleware.js";
import adminMiddleWare from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/welcome", authMiddleWare, adminMiddleWare, (req, res) => {
  res.json({
    message: "Welcome to the Admin Panel",
  });
});

export default router;
