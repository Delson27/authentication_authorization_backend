import express from "express";
const router = express.Router();

import authMiddleWare from "../middleware/auth.middleware.js";

router.get("/welcome", authMiddleWare, (req, res) => {
  const { username, userId, role } = req.userInfo;

  res.status(200).json({
    message: "Welcome to the Home Page",
    user: {
      username: username,
      _id: userId,
      role: role,
    },
  });
});

export default router;
