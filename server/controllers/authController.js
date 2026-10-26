import { asyncHandler } from "../middleware/asyncHandler.js";
import { ApiError } from "../middleware/errorHandler.js";
import { User } from "../models/userModel.js";
import { sendTokenResponse } from "../utils/token.js";

// @desc    Register a new user
// @route   POST /api/v1/user/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    throw new ApiError("Please fill full form!", 400);
  }
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError("Email already registered!", 400);
  }
  const user = await User.create({ name, email, phone, password, role });
  sendTokenResponse(user, 201, res, "User Registered!");
});

// @desc    Login user by email + role
// @route   POST /api/v1/user/login
export const login = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    throw new ApiError("Please provide email, password and role.", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError("Invalid Email Or Password.", 400);
  }
  if (user.role !== role) {
    throw new ApiError(`User with provided email and ${role} not found!`, 404);
  }
  user.password = undefined;
  sendTokenResponse(user, 200, res, "User Logged In!");
});

// @desc    Logout current user (clears auth cookie)
// @route   GET /api/v1/user/logout
export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .cookie("token", "", { httpOnly: true, expires: new Date(Date.now()) })
    .json({ success: true, message: "Logged Out Successfully." });
});

// @desc    Get current logged-in user
// @route   GET /api/v1/user/getuser
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});
