// import { json } from "express";
import { User } from "../models/user.models.js";
import bycryptjs from "bcryptjs";
import { generateTokensAndSendCookie } from "../utils/generatetoken.js";
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body; //request body holds username,email,
    console.log("Received data:", { username, email, password });
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "invalid email" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 charachters",
      });
    }
    const existingUserByMail = await User.findOne({ email: email });

    if (existingUserByMail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const existingUsername = await User.findOne({ userName: username });

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }
    const salt = await bycryptjs.genSalt(10);
    const hashedPassword = await bycryptjs.hash(password, salt);
    const PROFILE_PICS = [
      "/profile-1.webp",
      "/profile-2.png",
      "/profile-3.png ",
      "/profile-4.png",
      "/profile-5.png",
      "/profile-6.webp",
      "/profile-7.png",
      "/profile-8.png",
      "/profile-9.webp",
      "/profile-10.png",
    ];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });

    generateTokensAndSendCookie(newUser._id, res);
    await newUser.save();
    // let message = document.get;
    res
      .status(201)
      .json({ success: true, user: { ...newUser._doc, password: "••••••••" } });
  } catch (error) {
    console.log("Error in signup controller", error.message);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email: email }); //await
    const isPasswordCorrect = await bycryptjs.compare(password, user.password); //await

    if (!user || !isPasswordCorrect) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
    generateTokensAndSendCookie(user._id, res);
    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: "••••••••" } });
  } catch (error) {
    console.log("Error in Login controller", error.message);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-cookie");
    res.status(201).json({
      success: true,
      user: { success: true, message: "Logged out successfully" },
    });
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
// export async function authCheck(req, res) {
//   try {
//     res.status(200).json({ success: true, user: req.user });
//   } catch (error) {
//     console.log("Error in authCheck", error.message);

//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }
export async function authCheck(req, res) {
	try {
		console.log("req.user:", req.user);
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
