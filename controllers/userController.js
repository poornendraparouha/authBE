import User from "../models/user.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password -refreshToken",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find().select("-password -refreshToken");

    if (!user.length) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, gender, address, profileImage } = req.body;
    const updateData = {firstName, lastName, phone, gender, address, profileImage}

    if(req.file){
      updateData.profileImage = `/uploads/${req.file.filename}`
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if(!user) {
      return res.status(404).jsn({
        success: false,
        mesage: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const {currentPassword, newPassword} = req.body;

    if(!currenPassword || !newPassword){
      return res.status(400).json({
        success: false,
        mesage: "current password and new password is required"
      })
    }

    const user = await User.findById(req.user.userId);

    if(!user){
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if(!isMatch){
      return res.status(400).json({
        success: false,
        message: "Incorrect Password"
      })
    }

    const hashedPassword =  await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    return res.status(200).json({
      success:true,
      message:"Password changed successfully"
    })

  } catch (error) {
    console.error("Change password error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const forgetPassword = aync (req, res) => {
  try {
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    return res.status(200).json({
        success: true,
        resetToken,
      });

  } catch (error) {
    console.error("Forget password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const {resetToken} = req.params;
    const {password} = req.body;

    const user = await User.findOne({resetPasswordToken: resetToken, resetPasswordExpire: {$gt: Date.now()}});
    if(!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid token"
      })
    }

    user.password = await bcrypt.hash(password, 10)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    
     return res.status(200).json({
        success: true,
        message:
          "Password reset successfully",
      });

  } catch (error) {
    console.error("Reset password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}