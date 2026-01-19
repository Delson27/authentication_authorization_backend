import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//register controller

const registerUser = async (req, res) => {
  try {
    //extrct user data from req.body
    const { username, email, password, role } = req.body;

    //check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with same email or username already exists",
      });
    } else {
      //hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create a new user
      const newCreatedUser = await User.create({
        username,
        email,
        password: hashedPassword,
        role: role || "user",
      });

      if (newCreatedUser) {
        res.status(201).json({
          success: true,
          message: "User registered successfully",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Failed to register user",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred while registering user",
    });
  }
};

//login controller

const loginUser = async (req, res) => {
  try {
    //extract user data from req.body
    const { email, password } = req.body;

    //check if the user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //compare the password
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (isPasswordMatch) {
        //create a token
        const accessToken = jwt.sign(
          {
            userId: existingUser._id,
            username: existingUser.username,
            role: existingUser.role,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "15m",
          }
        );

        res.status(200).json({
          success: true,
          message: "User logged in successfully",
          accessToken,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Some error occurred while logging in",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    //extract old password and new password from req.body
    const { oldPassword, newPassword } = req.body;

    //find the current user from database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    //check if old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    //update the password in database

    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred while changing password",
    });
  }
};

export { registerUser, loginUser, changePassword };
