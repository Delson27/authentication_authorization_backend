import multer from "multer";
import path from "path";

//set our multer storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

//file filter function

const checkFilterType = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

//multer middleware

const uploadImageMiddleware = multer({
  storage: storage,
  fileFilter: checkFilterType,
  limits: {
    fileSize: 5 * 1024 * 1024, //5MB
  },
});

export default uploadImageMiddleware;
