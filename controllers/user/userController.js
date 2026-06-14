import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import logger from "../../utils/logger.js";

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password -refreshToken",
    );

    if (!user) {
      logger.warn(`Profile requested but user not found: ${req.user.userId}`);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    logger.info(`Profile fetched: ${req.user.userId}`);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error(`Profile fetch error: ${error.message}`);
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
      logger.warn("No users found");
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    logger.info(`All users fetched by ${req.user.email}`);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    logger.error(`Get users error: ${error.message}`);
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
      logger.info(`Profile image uploaded by ${req.user.userId}`);
      updateData.profileImage = `/uploads/${req.file.filename}`
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password -refreshToken");

    if(!user) {
      logger.warn(`Profile update failed. User not found: ${req.user.userId}`);
      return res.status(404).json({
        success: false,
        mesage: "User not found"
      })
    }
    logger.info(`Profile updated: ${req.user.userId}`);
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: user
    });

  } catch (error) {
    logger.error(`Profile update error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const {currenPassword , newPassword} = req.body;

    if(!currenPassword  || !newPassword){
      logger.warn(`Password change missing fields: ${req.user.userId}`);
      return res.status(400).json({
        success: false,
        mesage: "current password and new password is required"
      })
    }

    const user = await User.findById(req.user.userId);

    if(!user){
      logger.warn(`Password change failed. User not found: ${req.user.userId}`);
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }

    const isMatch = await bcrypt.compare(currenPassword, user.password);

    if(!isMatch){
      logger.warn(`Incorrect current password: ${req.user.userId}`);
      return res.status(400).json({
        success: false,
        message: "Incorrect Password"
      })
    }

    const hashedPassword =  await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    logger.info(`Password changed: ${req.user.userId}`);
    return res.status(200).json({
      success:true,
      message:"Password changed successfully"
    })

  } catch (error) {
    logger.error(`Change password error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if(!user){
      logger.warn(`Delete account failed. User not found: ${req.user.userId}`);
      return res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    if(user.profileImage){
      const imagePath = "." + user.profileImage;
      if(fs.existsSync(imagePath)) {
        logger.info(`Profile image deleted: ${req.user.userId}`);
        fs.unlinkSync(imagePath)
      }
    }

    await User.findByIdAndDelete(req.user.userId)
    logger.info(`Account deleted: ${req.user.userId}`);
    return res.status(200).json({
        success: true,
        message:
          "Account deleted successfully",
      });
      
  } catch (error) {
    logger.error(`Delete account error: ${error.message}`);
    console.error("Account delete error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
