import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { asyncHandler } from "./asyncHandler.js";
import { ApiError } from "./errorHandler.js";
import { config } from "../config/env.js";

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return next(new ApiError("User Not Authorized", 401));
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return next(new ApiError("User Not Authorized", 401));
    }
    next();
  } catch {
    return next(new ApiError("Json Web Token is invalid or expired, Try again!", 401));
  }
});

export const ensureRole = (user, role) => {
  if (user.role !== role) {
    throw new ApiError(`${role} not allowed to access this resource.`, 403);
  }
};
