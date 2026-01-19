import imageModel from "../models/images.js";
import { uploadToCloudinary } from "../helpers/cloudinaryhelper.js";
import file from "fs";
import cloudinary from "../config/cloudinaryConfig.js";

const uploadImage = async (req, res) => {
  try {
    //check if file is present or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }
    //upload image to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    //store image url,publicId,uploadedBy info in database

    const newImage = await imageModel.create({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    //delete file from local storage
    //file.ulinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    console.log("Error uploading image:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const fetchImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const totalImages = await imageModel.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObject = {};
    sortObject[sortBy] = sortOrder;

    const images = await imageModel
      .find()
      .sort(sortObject)
      .skip(skip)
      .limit(limit);
    if (images) {
      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: totalPages,
        totalImages: totalImages,
        message: "Images fetched successfully",
        data: images,
      });
    }
  } catch (err) {
    console.log("Error fetching images:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdOfImageToBeDeleted = req.params.id; //unique id the user has to pass which mongoose creates automatically for each document
    const userId = req.userInfo.userId;

    const image = await imageModel.findById(getCurrentIdOfImageToBeDeleted);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }
    //check if  this image uploaded by the same user who is trying to delete it
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }

    //delete image from cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    //delete image from database
    await imageModel.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);
    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (err) {
    console.log("Error deleting image:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { uploadImage, fetchImages, deleteImageController };
