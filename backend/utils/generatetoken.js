import jwt from "jsonwebtoken";
import { ENV_variables } from "../config/envVariables.js";

export const generateTokensAndSendCookie = (userID, res) => {
  const token = jwt.sign({ userID }, ENV_variables.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-cookie", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite:"strict",
    secure:ENV_variables.NODE_ENV !== "developement"
  });
  return token
};
