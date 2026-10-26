import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your Name!"],
      minLength: [3, "Name must contain at least 3 Characters!"],
      maxLength: [30, "Name cannot exceed 30 Characters!"],
    },
    email: {
      type: String,
      required: [true, "Please enter your Email!"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid Email!"],
    },
    phone: {
      type: Number,
      required: [true, "Please enter your Phone Number!"],
    },
    password: {
      type: String,
      required: [true, "Please provide a Password!"],
      minLength: [8, "Password must contain at least 8 characters!"],
      maxLength: [32, "Password cannot exceed 32 characters!"],
      select: false,
    },
    role: {
      type: String,
      required: [true, "Please select a role"],
      enum: ["Job Seeker", "Employer"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function comparePassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJWTToken = function getJWTToken() {
  return jwt.sign({ id: this._id }, config.jwtSecret, {
    expiresIn: config.jwtExpires,
  });
};

export const User = mongoose.model("User", userSchema);
