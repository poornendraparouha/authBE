import User from "../models/user.js";

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

  if(!user.length){
    return res.status(404).json({
      success: false,
      message: "No users found"
    })
  }

  return res.status(200).json({
    success: true,
    data: user
  })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
