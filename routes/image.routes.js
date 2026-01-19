import express from "express";
import authMiddleWare from "../middleware/auth.middleware.js";
import adminMiddleWare from "../middleware/admin.middleware.js";
import uploadImageMiddleware from "../middleware/uploadImage.middleware.js";
import { uploadImage } from "../controllers/image.controller.js";
import { fetchImages } from "../controllers/image.controller.js";
import { deleteImageController } from "../controllers/image.controller.js";

const router = express.Router();

//upload image
router.post(
  "/upload",
  authMiddleWare,
  adminMiddleWare,
  uploadImageMiddleware.single("image"),
  uploadImage
);

//get all images

router.get("/get", authMiddleWare, fetchImages);

//delete image
router.delete(
  "/delete/:id",
  authMiddleWare,
  adminMiddleWare,
  deleteImageController
);

export default router;
