import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  console.log("Auth Middleware Invoked");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided. Please Login to continue",
    });
  }

  //decode the token
  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodeToken);

    req.userInfo = decodeToken;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;
