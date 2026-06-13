import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is reqired"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "first name is reqired"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      default:null,
    },
    phone: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    profileImage: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: null,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
    provider:{
      type:String,
      enum:["local", "google"],
      default: "local"
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
