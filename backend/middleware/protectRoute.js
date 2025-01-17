import jwt from "jsonwebtoken";
import { ENV_variables } from "../config/envVariables.js";
import { User } from "../models/user.models.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-cookie"];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No token provided" });
    }
    const decoded = jwt.verify(token, ENV_variables.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid token" });
    }
    const user = await User.findById(decoded.userID).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectROute middleware" + error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
