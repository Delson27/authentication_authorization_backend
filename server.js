import dotenv from "dotenv";
dotenv.config();

import connectToDB from "./database/db.js";
connectToDB();

import authRoutes from "./routes/auth.routes.js";
import homeRoutes from "./routes/home.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import imageRoutes from "./routes/image.routes.js";

import express from "express";
const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
6;
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", imageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
