import cloudinary from "../config/cloudinaryConfig.js";

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.log("Error uploading to Cloudinary:", error);
    throw new Error("Cloudinary upload failed");
  }
};

export { uploadToCloudinary };
