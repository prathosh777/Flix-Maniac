authcontroller;
// // import { json } from "express";
// import {User} from "../models/user.models.js"
// export async function signup(req, res) {
//   try {
//     const { username, email, password } = req.body; //request body holds username,email,password
//     if (!email || !password || !username) {
//       return res
//         .status(400)
//         .json({ success: false, message: "All fields are required" });
//     }
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ success: false, message: "invalid email" });
//     }
//     if (password.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be atleast 6 charachters",
//       });
//     }
//     const existingUserByMail = await User.findOne({ email: email });

//     if (existingUserByMail) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists",
//       });
//     }
//     const existingUsername = await User.findOne({ userName: username });

//     if (existingUsername) {
//       return res.status(400).json({
//         success: false,
//         message: "Username already exists",
//       });

//     }
//     const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
//     const image =
//       PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
//     const newUser = new User({
//       email,
//       password,
//       username,
//       image,
//     });
//     await newUser.save()
//   } catch (error) {
//     console.log("Error in signup controller",error.message);

//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// }
// export async function login(req, res) {
//   res.send("Login route");
// }
// export async function logout(req, res) {
//   res.send("Logout route");
// }

//!protectroute
// import jwt from "jsonwebtoken";
// import { ENV_variables } from "../config/envVariables.js";
// import { User } from "../models/user.models.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     // Retrieve the token from cookies
//     const token = req.cookies["jwt-cookie"];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized - No token provided" });
//     }

//     // Verify the token
//     const decode = jwt.verify(token, ENV_variables.JWT_SECRET);
//     if (!decode) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized - Invalid token" });
//     }

//     // Find user and check existence
//     const user = await User.findById(decode.userId).select("-password");
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Attach user to request object and proceed
//     req.user = user;
//     next();
//   } catch (error) {
//     if (error.name === "TokenExpiredError") {
//       return res
//         .status(401)
//         .json({ success: false, message: "Token expired, please log in again" });
//     }
//     console.log("Error in protectRoute middleware: " + error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
//!hhin
// import jwt from "jsonwebtoken";
// import { ENV_variables } from "../config/envVariables.js";
// import { User } from "../models/user.models.js";

// export const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies["jwt-cookie"];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized - No token provided" });
//     }
//     const decoded = jwt.verify(token, ENV_variables.JWT_SECRET);
//     if (!decoded) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Unauthorized - Invalid token" });
//     }

//     const user = await User.findById(decoded.userID).select("-password");
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     console.error("Error in protectRoute middleware: " + error.message);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// };
//! authscreen
// import { ChevronRight } from "lucide-react";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const AuthScreen = () => {
//   const [email, setEmail] = useState("");
//   return (
//     <div className="hero-bg relative">
//       <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
//         <Link className="flex" to={"/"}>
//           <img
//             className="w-40 "
//             src="/Flix-shadow.png"
//             alt="Flix Maniac logo"
//           />
//         </Link>
//         <Link
//           to={"/login"}
//           className=" text-white bg-[#3077a3] py-1 px-2 rounded"
//         >
//           Sign In
//         </Link>
//       </header>
//       <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6x1 mx-auto">
//         <h1 className="text-4x1 md:text-6xl font-bold mb-4">
//           Unlimited movies, TV shows, and more
//         </h1>
//         <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
//         <p className="mb-4 m-8">
//           Ready to watch? Enter your email to create or restart your membership.
//         </p>
//         <form className="flex flex-col md:flex-row gap-4 w-1/2">
//           <input
//             type="email"
//             placeholder="Email address"
//             className="p-2  rounded flex-1 bg-black/80 border border-gray-700"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button className="bg-[#3077a3] text-xl lg:text-2x1 px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
//             Get Started
//             <ChevronRight className="size-8 md:size-10" />
//           </button>
//         </form>
//       </div>
//       <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" />
//       //!sections
//       <div className="py-10 bg-black text-white">
//         <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
//           {/* left side */}
//           <div className="flex-1 border">left</div>
//           {/* right side */}
//           <div className="flex-1 border border-red-600">right</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthScreen;
//!
// import { ChevronRight } from "lucide-react";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const AuthScreen = () => {
//   const [email, setEmail] = useState("");
//   return (
//     <div className="hero-bg relative">
//       <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
//         <Link className="flex" to={"/"}>
//           <img
//             className="w-40 "
//             src="/Flix-shadow.png"
//             alt="Flix Maniac logo"
//           />
//         </Link>
//         <Link
//           to={"/login"}
//           className=" text-white bg-[#3077a3] py-1 px-2 rounded"
//         >
//           Sign In
//         </Link>
//       </header>
//       <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6x1 mx-auto">
//         <h1 className="text-4x1 md:text-6xl font-bold mb-4">
//           Unlimited movies, TV shows, and more
//         </h1>
//         <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
//         <p className="mb-4 m-8">
//           Ready to watch? Enter your email to create or restart your membership.
//         </p>
//         <form className="flex flex-col md:flex-row gap-4 w-1/2">
//           <input
//             type="email"
//             placeholder="Email address"
//             className="p-2  rounded flex-1 bg-black/80 border border-gray-700"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button className="bg-[#3077a3] text-xl lg:text-2x1 px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
//             Get Started
//             <ChevronRight className="size-8 md:size-10" />
//           </button>
//         </form>
//       </div>
//       {/* <div className="h-2 w-full  bg-[#5c5c5c]" aria-hidden="true" /> */}
//       {/*//! sections */}
//       <div className="py-10 bg-black text-white">
//         <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
//           {/* left side */}
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-4x1 md: text-5x1 font-extrabold mb-4">
//               Enjoy on your TV
//             </h2>
//             <p className="text-lg md:text-xl">
//               Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
//               Blu-ray players, and more.
//             </p>
//           </div>
//           {/* right side */}
//           <div className="flex-1 relative">
//             <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
//             <video
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
//               plays
//               Inline
//               autoPlay={true}
//               muted
//               Loop
//             >
//               <source src="/hero-vid.m4v" type="video/mp4" />
//             </video>
//           </div>
//         </div>
//       </div>
//       <div className="h-2 w-full  bg-[#5c5c5c]" aria-hidden="true" />
//       {/* //! */}
//       <div className="py-10 bg-black text-white">
//         <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
//           {/* leftside */}{" "}
//           <div className="flex-1">
//             <div className="relative">
//               {" "}
//               <img
//                 src="/stranger-things-lg.png"
//                 alt="stranger things image"
//                 className="mt-4"
//               />
//               <div className="flex item-center gap-2 absolute bottom-5 left-1/2 translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-25 border ☐ border-slate-500 rounded-md px-2">
//                 <img
//                   src="/stranger-things-sm.png"
//                   alt="Stranger things image"
//                 />
//                 <div className=" flex justify-between items-center w-full">
//                   <div className="flex flex-col gap-0">
//                     <span className="text-md 1g:text-lg font-bold">
//                       Stranger Things
//                     </span>
//                     <span className="text-sm text-blue-500">
//                       Downloading...
//                     </span>
//                   </div>
//                   <img src="/download-icon.gif" alt="" className="h-12" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* rightside */} <div></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthScreen;
//!signup page
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";

// const SignUpPage = () => {
//   const { searchParams } = new URL(document.location);
//   const emailValue = searchParams.get("email");
//   const [email, setEmail] = useState(emailValue || "");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { signup } = useAuthStore();
//   const handleSignUp = (e) => {
//     e.preventDefault();
//     signup({email, username, password});
//   };

//   return (
//     <div className="h-screen w-full hero-bg">
//       <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
//         <Link className="flex" to={"/"}>
//           <img
//             className="w-40 "
//             src="/Flix-shadow.png"
//             alt="Flix Maniac logo"
//           />
//         </Link>
//       </header>
//       <div className="flex justify-center items-center mt-20 mx-3">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h1 className="text-center text-white text-2xl font-bold mc-4">
//             Sign up
//           </h1>
//           <form className="space-y-4" onSubmit={handleSignUp}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="you@example.com"
//                 id="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 username
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="Name"
//                 id="username"
//                 value={username}
//                 onChange={(e) => {
//                   setUsername(e.target.value);
//                 }}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 password
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="••••••••"
//                 id="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//               />
//             </div>
//             <button className="w-full py-2 btncolor text-white font-semibold rounded-md">
//               Sign up
//             </button>
//           </form>
//           <div className="text-center text-gray-400">
//             Already a member?{" "}
//             <Link to={"/login"} className="txtcolor">
//               Sign in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
//!app
// import React, { useEffect } from 'react'
// import { Route, Routes } from 'react-router-dom'
// import LogInPage from './pages/LogInPage'
// import SignUpPage from './pages/SIgnUpPage'
// import HomePage from './pages/homepages/HomePage'
// import Footer from './components/Footer'
// import { Toaster } from 'react-hot-toast'
// import { useAuthStore } from './store/authUser'

// const App = () => {
//   const {user , authCheck}= useAuthStore()
//   console.log("Auth user is here",user);

//   useEffect(()=>{
//     authCheck()
//   },[])

//   return (
//     <div>
//        <Routes>
//         <Route path='/' element={<HomePage/>}/>
//         <Route path='/signup' element={<SignUpPage/>}/>
//         <Route path='/login' element={<LogInPage/>}/>

//        </Routes>
//        <Footer />
//        <Toaster />
//     </div>
//   )
// }

// export default App

{
  /* {contentType === "movie"
          ? MOVIE_CATEGORY.map((category) => (
              <MoviesSlider key={category.id} category={category} />
            ))
          : TV_CATEGORY.map((category) => (
              <MoviesSlider key={category.id} category={category} />
            ))} */
}
//? Search history page
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { SMALL_IMG_BASE_URL } from "../utils/constants";
// import { Trash } from "lucide-react";
// import toast from "react-hot-toast";

// function formatDate(dateString) {
//   // Create a Date object from the input date string
//   const date = new Date(dateString);

//   const monthNames = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   // Extract the month, day, and year from the Date object
//   const month = monthNames[date.getUTCMonth()];
//   const day = date.getUTCDate();
//   const year = date.getUTCFullYear();

//   // Return the formatted date string
//   return `${month} ${day}, ${year}`;
// }

// const SearchHistoryPage = () => {
//   const [searchHistory, setSearchHistory] = useState([]);

//   useEffect(() => {
//     const getSearchHistory = async () => {
//       try {
//         const res = await axios.get(`/api/v1/search/history`);
//         setSearchHistory(res.data.content);
//       } catch (error) {
//         setSearchHistory([]);
//       }
//     };
//     getSearchHistory();
//   }, []);

//   const handleDelete = async (entry) => {
//     try {
//       await axios.delete(`/api/v1/search/history/${entry.id}`);
//       setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
//     } catch (error) {
//       toast.error("Failed to delete search item");
//     }
//   };

//   if (searchHistory?.length === 0) {
//     return (
//       <div className="bg-black min-h-screen text-white">
//         <Navbar />
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-8">Search History</h1>
//           <div className="flex justify-center items-center h-96">
//             <p className="text-xl">No search history found</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <Navbar />

//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Search History</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
//           {searchHistory?.map((entry) => (
//             <div
//               key={entry.id}
//               className="bg-gray-800 p-4 rounded flex items-start"
//             >
//               <img
//                 src={SMALL_IMG_BASE_URL + entry.image}
//                 alt="History image"
//                 className="size-16 rounded-full object-cover mr-4"
//               />
//               <div className="flex flex-col">
//                 <span className="text-white text-lg">{entry.title}</span>
//                 <span className="text-gray-400 text-sm">
//                   {formatDate(entry.createdAt)}
//                 </span>
//               </div>

//               <span
//                 className={`py-1 px-3 min-w-20 text-center rounded-full text-sm  ml-auto ${
//                   entry.searchType === "movie"
//                     ? "bg-red-600"
//                     : entry.searchType === "tv"
//                     ? "bg-blue-600"
//                     : "bg-green-600"
//                 }`}
//               >
//                 {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
//               </span>
//               <Trash
//                 className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
//                 onClick={() => handleDelete(entry)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SearchHistoryPage;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import { SMALL_IMG_BASE_URL } from "../utils/constants";
// import { Trash } from "lucide-react";
// import toast from "react-hot-toast";

// function formatDate(dateString) {
//   // Create a Date object from the input date string
//   const date = new Date(dateString);

//   const monthNames = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
//   ];

//   // Extract the month, day, and year from the Date object
//   const month = monthNames[date.getUTCMonth()];
//   const day = date.getUTCDate();
//   const year = date.getUTCFullYear();

//   // Return the formatted date string
//   return `${month} ${day}, ${year}`;
// }

// const SearchHistoryPage = () => {
//   const [searchHistory, setSearchHistory] = useState([]);

//   useEffect(() => {
//     const getSearchHistory = async () => {
//       try {
//         const res = await axios.get(`/api/v1/search/history`);
//         setSearchHistory(res.data.content);
//       } catch (error) {
//         setSearchHistory([]);
//       }
//     };
//     getSearchHistory();
//   }, []);

//   const handleDelete = async (entry) => {
//     try {
//       await axios.delete(`/api/v1/search/history/${entry.id}`);
//      return setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
//     } catch (error) {
//       toast.error("Failed to delete search item");
//     }
//   };

//   if (searchHistory?.length === 0) {
//     return (
//       <div className="bg-black min-h-screen text-white">
//         <Navbar />
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <h1 className="text-3xl font-bold mb-8">Search History</h1>
//           <div className="flex justify-center items-center h-96">
//             <p className="text-xl">No search history found</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-black text-white min-h-screen">
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         <h1 className="text-3xl font-bold mb-8">Search History</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {searchHistory?.map((entry) => (
//             <div
//               key={entry.id}
//               className="bg-gray-800 p-4 rounded flex items-start"
//             >
//               <img
//                 src={SMALL_IMG_BASE_URL + entry.image}
//                 alt={`  ${entry.title}`}
//                 className="w-16 h-16 rounded-full object-cover mr-4"
//               />
//               <div className="flex flex-col">
//                 <span className="text-white text-lg">{entry.title}</span>
//                 <span className="text-gray-400 text-sm">
//                   {formatDate(entry.createdAt)}
//                 </span>
//               </div>
//               <span
//                 className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
//                   entry.searchType === "movie"
//                     ? "bg-red-600"
//                     : entry.searchType === "tv"
//                     ? "bg-blue-600"
//                     : "bg-green-600"
//                 }`}
//               >
//                 {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
//               </span>
//               <Trash
//                 className="w-5 h-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
//                 onClick={() => handleDelete(entry)}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchHistoryPage;
// const Footer = () => {
// 	return (
// 		<footer className='py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800'>
// 			<div className='flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
// 				<p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
// 					Built by{" "}
// 					<a
// 						href='https://github.com/prathosh777'
// 						target='_blank'
// 						className='font-medium underline underline-offset-4'
// 					>
// 						Prathosh kumar
// 					</a>
// 					. The source code is available on{" "}
// 					<a
// 						href='https://github.com/prathosh777'
// 						target='_blank'
// 						rel='noreferrer'
// 						className='font-medium underline underline-offset-4'
// 					>
// 						GitHub
// 					</a>
// 					.
// 				</p>
// 			</div>
// 		</footer>
// 	);
// };
// export default Footer;
// import React from "react";
// import Navbar from "../components/Navbar";

// const AboutPage = () => {
//   return (
//     <div className="relative bg-black h-screen text-white">
//       <Navbar />

//       <div className="max-w-6xl md:text-lg text-base mx-auto md:px-20  px-10 py-8">
//         <h2 className="md:text-4xl text-xl font-bold mb-8">
//           About Flix Maniac
//         </h2>
//         <p className="mb-4">
//           Welcome to Flix Maniac, your ultimate destination for all things
//           entertainment! Whether you're a movie buff, a TV series addict, or a
//           celebrity enthusiast, Flix Maniac has got you covered. Powered by the
//           comprehensive TMDB API, we bring you the latest and greatest in
//           movies, TV shows, and celebrity news.
//         </p>
//         <p className="mb-4">
//           At Flix Maniac, we believe in the magic of storytelling. From
//           heart-pounding action movies to tear-jerking dramas, from binge-worthy
//           TV series to behind-the-scenes celebrity insights, we have something
//           for everyone. Our platform is designed to help you discover new
//           favorites, stay updated with trending content, and dive deep into the
//           world of entertainment.
//         </p>
//         <h2 className="md:text-4xl text-xl font-bold mb-8">
//           Why choose Flix Maniac ?
//         </h2>
//         <p className="mb-4">
//           <span className="font-bold">Extensive Database:</span> With access to
//           millions of movies and TV shows, you'll never run out of options.
//         </p>
//         <p className="mb-4">
//           <span className="font-bold">User-Friendly Interface:</span> Navigate
//           seamlessly through our easy-to-use platform and find what you love in
//           no time.
//         </p>
//         <p className="mb-48">
//           Join the Flix Maniac community today and embark on an unforgettable
//           entertainment journey!
//         </p>
//       </div>
//       <div className="max-w-6xl md:text-lg text-base mx-auto  px-4 py-8"></div>
//     </div>
//   );
// };

// export default AboutPage;

// import React, { useState, useRef } from "react";
// import emailjs from 'emailjs-com';
// import Navbar from "../components/Navbar";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     user_name: "",
//     user_email: "",
//     message: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const form = useRef();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         "service_zehhwuy", // Replace with your service ID
//         "template_rhranf9", // Replace with your template ID
//         form.current,
//         "WEJFesRXefUHiJUhj" // Replace with your user ID
//       )
//       .then((result) => {
//         console.log(result.text);
//         setIsSubmitted(true);
//         setFormData({ user_name: "", user_email: "", message: "" }); // Reset form after submission
//       })
//       .catch((error) => {
//         console.error("Error sending email:", error.text);
//       });
//   };

//   return (
//     <div className="bg-black text-white">
//       <Navbar />
//       <div className="relative  text-white min-h-screen flex flex-col justify-between">
//         <div className="flex-grow max-w-6xl md:text-lg text-base mx-auto md:px-20 px-10 py-8">
//           <h1 className="md:text-4xl text-xl font-bold mb-8">Contact Us</h1>

//           {isSubmitted ? (
//             <div className="success-message text-center">
//               <p>Thank you for reaching out! We'll get back to you soon.</p>
//             </div>
//           ) : (
//             <form ref={form} onSubmit={handleSubmit} className="space-y-4">
//               <div className="form-group">
//                 <label htmlFor="name" className="items-center mb-2 ">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="user_name"
//                   value={formData.user_name}
//                   onChange={handleChange}
//                   className=" w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="email" className="block mb-2">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleChange}
//                   className="block w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="message" className="block mb-2">Message</label>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="block w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Send Message
//               </button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import emailjs from 'emailjs-com';
// import Navbar from '../components/Navbar';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     user_name: '',
//     user_email: '',
//     message: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     emailjs
//       .send(
//         'service_zehhwuy', // Replace with your service ID
//         'template_rhranf9', // Replace with your template ID
//         formData,
//         'WEJFesRXefUHiJUhj' // Replace with your user ID
//       )
//       .then((result) => {
//         console.log(result.text);
//         setIsSubmitted(true);
//         setFormData({ nameuser_: '', user_email: '', message: '' }); // Reset form after submission
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error.text);
//       });
//   };

//   const formVariant = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   };

//   const buttonVariant = {
//     hover: {
//       scale: .99,
//       transition: { yoyo: 5 }, // Creates a bouncing effect on hover
//     },
//     tap: { scale: 0.9 }, // Shrinks a bit when clicked
//   };

//   const successVariant = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.7 } },
//   };

//   return (
//     <div className="bg-black text-white">
//       <Navbar />
//       <div className="relative bg-black text-white min-h-screen flex flex-col justify-between">
//         <div className="flex-grow  w-[45%] max-w-6xl md:text-lg text-base mx-auto md:px-20 px-10 py-8">
//           <h1 className="md:text-4xl text-xl font-bold mb-8">Contact Us</h1>
//           {isSubmitted ? (
//             <motion.div
//               className="success-message text-center p-4 bg-green-700 text-white rounded"
//               variants={successVariant}
//               initial="hidden"
//               animate="visible"
//             >
//               <p>Thank you for reaching out! We'll get back to you soon.</p>
//             </motion.div>
//           ) : (
//             <motion.form
//               onSubmit={handleSubmit}
//               initial="hidden"
//               animate="visible"
//               variants={formVariant}
//               className=" items-center"
//             >
//               <motion.div className="text-center  ">
//                 <p htmlFor="user_name" className=" mb-5">Name</p>
//                 <input
//                   type="text"
//                   id="user_name"
//                   name="user_name"
//                   value={formData.user_name}
//                   onChange={handleChange}
//                   className=" w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
//                   required
//                 />
//               </motion.div>

//               <motion.div className="text-center my-10 ">
//                 <p htmlFor="user_email" className=" mb-5">Email</p>
//                 <input
//                   type="email"
//                   id="user_email"
//                   name="user_email"
//                   value={formData.user_email}
//                   onChange={handleChange}
//                   className=" w-full p-2 bg-gray-800 text-white border border-gray-600 rounded"
//                   required
//                 />
//               </motion.div>

//               <motion.div className="text-center my-10 ">
//                 <p htmlFor="message" className=" mb-5">Message</p>
//                 <textarea
//                   id="message"
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className=" w-full p-2  bg-gray-800 text-white border border-gray-600 rounded"
//                   required
//                 />
//               </motion.div>

//               <motion.button
//                 type="submit"
//                 variants={buttonVariant}
//                 whileHover="hover"
//                 whileTap="tap"
//                 className="mt-20 mx-auto p-2 bg-yellow-500 text-black rounded hover:bg-yellow-600"
//               >
//                 Send Message
//               </motion.button>
//             </motion.form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
// import { ChevronRight } from "lucide-react";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import SignUpPage from "../SignUpPage";
// const AuthScreen = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     navigate(`/signup?email=${email}`);
//   };
//   return (
//     <div className=" hero-bg-2  relative">
//       {/* <header className="max-w-8xl mx-auto flex items-center justify-between px-20"> */}
//       <header className="max-w-6xl mx-auto flex flex-wrap  items-center justify-between mb-5 p-4 h-20 relative z-50">
//         <Link className="flex" to={"/"}>
//           <img className="w-40" src="/Flix-shadow.png" alt="Flix Maniac logo" />
//         </Link>
//         <Link
//           to={"/login"}
//           className="text-white bg-[#3077a3] py-1 px-2 rounded"
//         >
//           Sign In
//         </Link>
//       </header>
//       <div className="flex flex-col items-center justify-center text-center px-8 py-40 text-white max-w-6xl mx-auto">
//         <h1 className="text-4xl md:text-6xl font-bold mb-4">
//           Infinite entertainment, endless fun.
//         </h1>
//         <p className="text-lg mb-4 px-8">
//           Watch anywhere, anytime no excuses, just pure entertainment, no matter
//           where you are!
//         </p>
//         <p className="mb-4 m-8">
//           "Can’t wait to start watching? Enter your email now to join
//         </p>
//         <form
//           className="flex flex-col md:flex-row gap-4 w-1/2"
//           onSubmit={handleFormSubmit}
//         >
//           <input
//             type="email"
//             placeholder="Email address"
//             className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <button className="bg-[#3077a3] text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
//             Get Started
//             <ChevronRight className="w-8 md:w-10" />
//           </button>
//         </form>
//       </div>
//       {/* <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" /> */}
//       {/*//! sections */}
//       <div className="py-10 bg-black text-white">
//         <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
//           {/* left side */}
//           <div className="flex-1 px-10 text-center md:text-left">
//             <h2 className="text-2xl md:text-5xl font-extrabold mb-4">
//               Enjoy on your TV
//             </h2>
//             <p className="text-sm md:text-xl">
//               Watch on Smart TVs, Chromecast, Apple TV, Mobiles and more.
//             </p>
//           </div>
//           {/* right side */}
//           <div className="flex-1 relative">
//             <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
//             <video
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
//               playsInline
//               autoPlay={true}
//               muted
//               loop
//             >
//               <source src="/onepunchmanvid.mp4" type="video/mp4" />
//             </video>
//           </div>
//         </div>
//       </div>
//       <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" />
//       {/* //! */}
//       <div className="py-10 bg-black text-white">
//         <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
//           {/* leftside */}
//           <div className="flex-1">
//             <div className="relative">
//               <img
//                 src="/breakingbad1.webp"
//                 alt="stranger things image"
//                 className="mt-4"
//               />
//               <div className="flex item-center md:w-[50%] w-[80%] gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black  lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
//                 <img
//                   src="/Breakingbad.webp"
//                   alt="Breaking bad image"
//                   style={{ backgroundSize: "contain" }}
//                   height={"80%"}
//                 />
//                 <div className="flex justify-between items-center w-full">
//                   <div className="flex flex-col gap-0">
//                     <span className="text-md lg:text-lg font-bold">
//                       Breaking Bad
//                     </span>
//                     <span className="text-sm text-blue-500">
//                       Downloading...
//                     </span>
//                   </div>
//                   <img src="/download-icon.gif" alt="" className="h-12" />
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* rightside */}
//           <div className="flex-1  md:text-left text-center">
//             <h2 className="text-2xl md:text-5xl font-extrabold mb-4 text-balance">
//               Download your shows to watch offline
//             </h2>
//             <p className="text-sm md:text-xl">
//               Save your favourites easily and always have something to watch
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" />
//       {/* //! */}
//       <div className="p-10 bg-black text-white">
//         <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
//           {/* left side */}
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-2xl md:text-5xl font-extrabold mb-4">
//               Watch everywhere{" "}
//             </h2>
//             <p className="text-sm md:text-xl">
//               Stream unlimited movies and TV shows on your phone,
//               laptop,tablet,and TV.
//             </p>
//           </div>
//           {/* right side */}
//           <div className="flex-1 relative overflow-hidden">
//             <img
//               src="/device-pile.png"
//               alt="Device image"
//               className="mt-4 z-20 relative"
//             />
//             <video
//               className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
//               playsInline
//               autoPlay={true}
//               muted
//               loop
//             >
//               {/* <source src="/video-devices.m4v" type="video/mp4" /> */}
//               <source src="salaar.mp4" type="video/mp4" />
//             </video>
//           </div>
//         </div>
//       </div>
//       <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" />
//       {/* //! */}
//       <div className="p-10 bg-black text-white">
//         <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
//           {/* Left */}
//           <div className="flex-1 relative">
//             <img src="/kids.png" alt="Enjoy on your TV" className="mt-4" />
//           </div>
//           {/* Right */}
//           <div className="flex-1 text-center md:text-left">
//             <h2 className="text-2xl md:text-5xl font-extrabold mb-4">
//               Watch with your kids{" "}
//             </h2>
//             <p className="text-sm md:text-xl">
//               Watch your favourite movies and TV shows with your kids in a
//               secure environment.{" "}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthScreen;
//! after framar motion
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";
// const LogInPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useAuthStore();
//   const handleLogIn = (e) => {
//     e.preventDefault();
//     login({ email, password });
//   };
//   return (
//     <div className="h-screen w-full hero-bg-1">
//       <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
//         <Link className="flex" to={"/"}>
//           <img
//             className="w-40 "
//             src="/Flix-shadow.png"
//             alt="Flix Maniac logo"
//           />
//         </Link>
//       </header>
//       <div className="flex justify-center items-center mt-20 mx-3">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h1 className="text-center text-white text-2xl font-bold mc-4">
//             Login
//           </h1>
//           <form className="space-y-4" onSubmit={handleLogIn}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="you@example.com"
//                 id="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 password
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="••••••••"
//                 id="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//               />
//             </div>
//             <button className="w-full py-2 btncolor text-white font-semibold rounded-md">
//               Sign In
//             </button>
//           </form>
//           <div className="text-center text-gray-400">
//             Don't have an account?{" "}
//             <Link to={"/signup"} className="txtcolor">
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LogInPage;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";

// const SignUpPage = () => {
//   const { searchParams } = new URL(document.location);
//   const emailValue = searchParams.get("email");
//   const [email, setEmail] = useState(emailValue || "");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { signup } = useAuthStore();
//   const handleSignUp = (e) => {
//     e.preventDefault();
//     signup({email, username, password});
//   };

//   return (
//     <div className="h-screen w-full hero-bg-1">
//       <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
//         <Link className="flex" to={"/"}>
//           <img
//             className="w-40 "
//             src="/Flix-shadow.png"
//             alt="Flix Maniac logo"
//           />
//         </Link>
//       </header>
//       <div className="flex justify-center items-center mt-20 mx-3">
//         <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
//           <h1 className="text-center text-white text-2xl font-bold mt-4">
//             Sign up
//           </h1>
//           <form className="space-y-4" onSubmit={handleSignUp}>
//             <div>
//               <label
//                 htmlFor="email"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="you@example.com"
//                 id="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="username"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 username
//               </label>
//               <input
//                 type="text"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="Name"
//                 id="username"
//                 value={username}
//                 onChange={(e) => {
//                   setUsername(e.target.value);
//                 }}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="font-medium text-sm text-gray-300 block"
//               >
//                 password
//               </label>
//               <input
//                 type="password"
//                 className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
//                 placeholder="••••••••"
//                 id="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//               />
//             </div>
//             <button className="w-full py-2 btncolor text-white font-semibold rounded-md">
//               Sign up
//             </button>
//           </form>
//           <div className="text-center text-gray-400">
//             Already a member?{" "}
//             <Link to={"/login"} className="txtcolor">
//               Sign in
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
// import React from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";
// const PrivacyPolicy = () => {
//   const { user } = useAuthStore();

//   return (
//     <div className="bg-black text-white">
//       {user ? (
//         <Navbar />
//       ) : (
//         <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
//           <Link className="flex" to={"/"}>
//             <img
//               className="w-40 "
//               src="/Flix-shadow.png"
//               alt="Flix Maniac logo"
//             />
//           </Link>
//           <div className="flex items-center space-x-4">
//             <Link
//               to={"/login"}
//               className="text-white bg-[#3077a3] py-1 px-2 rounded"
//             >
//               Sign In
//             </Link>
//             <Link
//               to={"/signup"}
//               className="text-white bg-[#3077a3] py-1 px-2 rounded"
//             >
//               Sign Up
//             </Link>{" "}
//           </div>
//         </header>
//       )}
//       <div className="relative bg-black text-white min-h-screen flex flex-col justify-between">
//         <div className="flex-grow max-w-6xl md:text-lg text-base mx-auto md:px-20 px-10 py-8">
//           <h1 className="md:text-4xl text-xl font-bold mb-8" id="privacy">Privacy Policy</h1>

//           <h2 className="md:text-3xl text-lg font-bold mb-4">Introduction</h2>
//           <p className="mb-4">
//             Welcome to Flix Maniac. As a straightforward and user-friendly
//             platform, we prioritize your convenience and ease of use.
//           </p>

//           <h2 className="md:text-3xl text-lg font-bold mb-4">
//             Information We Collect
//           </h2>
//           <p className="mb-4">
//             Flix Maniac does not actively collect personal information from its
//             users. Any data that may be passively collected, such as usage
//             statistics, is solely for improving the site experience and ensuring
//             its smooth operation.
//           </p>

//           <h2 className="md:text-3xl text-lg font-bold mb-4">
//             User Responsibility
//           </h2>
//           <p className="mb-4">
//             Users are free to enjoy and use Flix Maniac as they see fit. We
//             trust our users to navigate the platform responsibly and
//             respectfully.
//           </p>

//           <h2 className="md:text-3xl text-lg font-bold mb-4">
//             Changes to This Privacy Policy
//           </h2>
//           <p className="mb-4">
//             As the platform evolves, this Privacy Policy may be updated to
//             reflect new features or user feedback. Any changes will be clearly
//             posted on this page.
//           </p>

//           <h2 className="md:text-3xl text-lg font-bold mb-4">Contact Me</h2>
//           <p className="mb-4">
//             If you have any questions or concerns, feel free to reach out at{" "}
//             <Link
//               className="underline text-blue-500 hover:text-blue-700"
//               to={"/contact"}
//             >
//               Contact me
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;
// import React from "react";
// import Navbar from "../components/Navbar";
// import { useAuthStore } from "../store/authUser";
// import { Link } from "react-router-dom";
// const DeveloperPage = () => {
  //   const { user } = useAuthStore();
  
  //   return (
    //     <div className="bg-black text-white">
    //       {user ? (
      //         <Navbar />
      //       ) : (
        //         <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
        //           <Link className="flex" to={"/"}>
        //             <img
        //               className="w-40 "
        //               src="/Flix-shadow.png"
        //               alt="Flix Maniac logo"
        //             />
        //           </Link>
        //           <div className="flex items-center space-x-4">
        //             <Link
        //               to={"/login"}
        //               className="text-white bg-[#3077a3] py-1 px-2 rounded"
        //             >
        //               Sign In
        //             </Link>
        //             <Link
        //               to={"/signup"}
        //               className="text-white bg-[#3077a3] py-1 px-2 rounded"
        //             >
        //               Sign Up
        //             </Link>{" "}
        //           </div>
        //         </header>
        //       )}
        //       <div className="relative bg-black text-white min-h-screen flex flex-col justify-between">
        //         <div className="flex-grow max-w-6xl md:text-lg text-base mx-auto md:px-20 px-10 py-8">
        //           <h2 className="md:text-4xl text-xl font-bold mb-8 " id="developer">Developed By</h2>
//           <p className="mb-4">
//             Flix Maniac is created by Prathosh Kumar, a fresh and passionate
//             MERN stack developer. With a love for movies and TV shows, Prathosh
//             built this platform to bring the best of entertainment to you.
//           </p>

//           <h2 className="md:text-4xl text-xl font-bold mb-8">About me</h2>
//           <p className="mb-4">
//             Hello, my name is Prathosh. I am a recent graduate and the sole
//             developer behind Flix Maniac. With a profound passion for movies, TV
//             shows, and all forms of entertainment, I embarked on the journey to
//             create Flix Maniac. This platform is designed to consolidate all the
//             features and content that avid entertainment enthusiasts would
//             desire.
//             <br className="mb-4" /> At Flix Maniac, I strive to deliver a
//             comprehensive and enjoyable experience, providing the latest
//             reviews, detailed synopses, and a user-friendly system to track your
//             viewing history. The creation of this platform has been an immensely
//             rewarding experience, and I am excited to share it with fellow fans
//             of the entertainment world. <br className="mb-4" /> I hope you find
//             Flix Maniac to be a valuable and enjoyable resource.
//           </p>
//           <div className="mt-8">
//             <h2 className="md:text-4xl text-xl font-bold mb-8">Built with</h2>

//             <Carousel />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeveloperPage;
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { LogOut, Search, Menu } from "lucide-react";
// import { useAuthStore } from "../store/authUser.js";
// import { useContentStore } from "../store/content.js";
// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     // console.log("isMobileMenuOpen",!isMobileMenuOpen);
//   };
//   const { user, logout } = useAuthStore();
//   const {contentType, setContentType } = useContentStore();
//   // console.log("content type",contentType);
  

//   return (
//     <header className="max-w-6xl mx-auto flex flex-wrap  items-center justify-between mb-5 p-4 h-20 relative z-50">
//        <div className="sm:hidden">
//           <Menu className=" size-6 cursor-pointer z-50" onClick={toggleMobileMenu}></Menu>
//         </div>
//       <div className="flex items-center gap-10 z-50">
//         <Link to={"/"}>
//           <img
//             src="/Flix.png"
//             alt="Flix Maniac Logo"
//             className="w-32 ml-5 sm:w-40 items-center"
//           />
//         </Link>

//         <div className="hidden sm:flex gap-10 items-center align-center">
//           <Link
//             to="/"
//             className=" hover:underline "
//             onClick={() => setContentType("movie")}
//           >
//             Movies
//           </Link>
//           <Link
//             to="/"
//             className="hover:underline"
//             onClick={() => setContentType("tv")}
//           >
//             TV Shows
//           </Link>
//           <Link
//             to="/history"
//             className="hover:underline"
//             onClick={() => setContentType("search")}
//           >
//             Search History
//           </Link>
//           {/* <Link onClick={logout} className="hover:underline">
//             Logout
//           </Link> */}
//         </div>
//       </div>
//       <div className="flex gap-7 items-center z-50">
//         <Link to={"/search"}>
//           <Search className="size-6 cursor-pointer" />
//         </Link>
//         <img
//           src={user.image}
//           alt="Avatar"
//           className="h-8 rounded-full cursor-pointer"
//         />
//         <LogOut className="size-6 signout cursor-pointer" onClick={logout} />
//         {/* <div className="sm:hidden">
//           <Menu className=" size-6 cursor-pointer" onClick={toggleMobileMenu}></Menu>
//         </div> */}
//       </div>
//       {isMobileMenuOpen && (
//         <div className="w-full top-20 absolute left-0 text-center sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
//           <Link
//             to={"/"}
//             className="block hover:underline p-2"
//             onClick={() => {
//               toggleMobileMenu();
//               setContentType("movie");
//             }}
            
//           >
//             Movies
//           </Link>
//           <Link
//             to={"/"}
//             className="block hover:underline p-2"
//             onClick={() => {
//               toggleMobileMenu();
//               setContentType("tv");
//             }}
            
//           >
//             TV Shows
//           </Link>
//           <Link
//             to={"/history"}
//             className="block hover:underline p-2"
//             onClick={toggleMobileMenu}
//           >
//             Search History
//           </Link>
//           <Link
//             to={"/login"}
//             className="block hover:underline p-2 lg:hidden"
//             onClick={logout}
//           >
//             Logout
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Navbar;
// import React, { useState } from "react";
// // import { useAuthStore } from "../../store/authUser";
// import Navbar from "../../components/Navbar";
// import { Link } from "react-router-dom";
// import { Info, Play } from "lucide-react";
// import useToGetTrendingMovies from "../../hook/useToGetTrendingMovies";
// import {
//   MOVIE_CATEGORY,
//   ORIGINAL_IMG_BASE_URL,
//   TV_CATEGORY,
// } from "../../utils/constants";
// import { useContentStore } from "../../store/content";
// import MoviesSlider from "../../components/MoviesSlider";

// const HomeScreen = () => {
//   const { trendingContent } = useToGetTrendingMovies();
//   const { contentType } = useContentStore();
//   const [imageLoading, setImageLoading] = useState(true);
//   if (!trendingContent) {
//     return (
//       <div className="flex  text-white relative h-screen">
//         <Navbar />
//         <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 -z-10 shimmer" />
//       </div>
//     );
//   }
//   // console.log(trendingContent);
//   return (
//     <>
//       {/* herosection */}

//       <div className="relative h-screen text-white">
//         <Navbar />
//         {/* //? Shimmer for hero section onloading */}
//         {imageLoading && (
//           <div className=" absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 -z-10 shimmer" />
//         )}
//         <img
//           className="absolute left-0 top-0 w-full h-full object-cover -z-50"
//           src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
//           alt="Hero image"
//           onLoad={() => setImageLoading(false)}
//         />
//         <div
//           className="absolute left-0 top-0 w-full h-full bg-black/50 -z-50"
//           aria-hidden="true"
//         />
//         <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center  px-8 md:px-16 lg:px-32 z-10">
//           <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

//           <div className="max-w-2xl">
//             <h1 className="mt-4  text-4xl sm:text-6xl font-extrabold ">
//               {trendingContent?.title || trendingContent?.name}
//             </h1>
//             <p className="mt-2 text-lg">
//               {trendingContent?.release_date?.split("-")[0] ||
//                 trendingContent?.first_air_date?.split("-")[0]}{" "}
//               | {trendingContent?.adult ? "18+" : "PG-13"}
//             </p>
//             <p className="mt-4 text-lg ">
//               {trendingContent?.overview.length > 200
//                 ? `${trendingContent?.overview.slice(0, 200)}...`
//                 : trendingContent?.overview}
//             </p>
//           </div>
//           <div className="flex mt-8">
//             <Link
//               className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center "
//               to={`/watch/${trendingContent?.id}`}
//             >
//               <Play className="size-6 md:size-8 mr-2 fill-black " />
//               Play
//             </Link>
//             <Link
//               className="bg-gray-500/70 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center "
//               to={`/watch/${trendingContent?.id}`}
//             >
//               <Info className="size-6 md:size-8 mr-2  " />
//               More Info
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col gap-10 bg-black text-white py-10">
//         {/* herosection ends here*/}

//         {contentType === "movie"
//           ? MOVIE_CATEGORY.map((category, index) => (
//               <MoviesSlider
//                 key={`${category.id}-${index}`}
//                 category={category}
//               />
//             ))
//           : TV_CATEGORY.map((category, index) => (
//               <MoviesSlider
//                 key={`${category.id}-${index}`}
//                 category={category}
//               />
//             ))}
//       </div>
//     </>
//   );
// };

// export default HomeScreen;
// import React, { useEffect, useRef, useState } from "react";
// import { useContentStore } from "../store/content";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// const MoviesSlider = ({ category }) => {
//   const { contentType } = useContentStore();
//   const [content, setContent] = useState([]);
//   const [showArrows, setShowArrows] = useState(false);
//   const sliderRef = useRef(null);
//   const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
//   const formattedCategoryName =
//     category.replaceAll("_", " ")[0].toUpperCase() +
//     category.replaceAll("_", " ").slice(1);

//     const scrollLeft = () => {
//       if (sliderRef.current) {
//         sliderRef.current.scrollBy({left:-sliderRef.current.offsetWidth, behavior:"smooth"});
//       }
//     }
//     const scrollRight = () => {
//       if (sliderRef.current) {
//         sliderRef.current.scrollBy({left:sliderRef.current.offsetWidth, behavior:"smooth"});
//       }
//     }
//   useEffect(() => {
//     const getContent = async () => {
//       const res = await axios.get(`/api/v1/${contentType}/${category}`);
//       setContent(res.data.content);
//     };
//     getContent();
//   }, [contentType, category]);
//   return (
//     <div
//       className="text-white bg-black  relative px-5 md:px-20"
//       onMouseEnter={() => setShowArrows(true)}
//       onMouseLeave={() => setShowArrows(false)}
//     >
//       <h2 className="text-2xl font-bold mb-4">
//         {formattedCategoryName} {formattedContentType}
//       </h2>
//       <div className="flex space-x-4 overflow-x-scroll scrollbar-hide " ref={sliderRef}>
//         {content.map((item) => (
//           <Link
//             to={`/watch/${item.id}`}
//             className={" md:min-w-[200px] min-w-[150px] relative group"}
//             key={item.id}
//           >
//             <div className="rounded-lg overflow-hidden">
//               <img
//                 src={SMALL_IMG_BASE_URL + item?.poster_path}
//                 alt="Movie image"
//                 className="transition-transform duration-300 ease-in-out group-hover:scale-125"
//               />
//             </div>
//             {/* <p className="text-center mt-2">{item.title || item.name}</p> */}
//           </Link>
//         ))}
//       </div>
//       {showArrows && (
//         <div>
//           <button onClick={scrollLeft} className="absolute left-5 top-1/2 -translate-y-1/2 md:left-24 flex items-center justify-center size-12 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 text-white z-10 ">
//           <ChevronLeft size={24}
//           />
//           </button>
//           <button onClick={scrollRight} className="absolute right-5 top-1/2 -translate-y-1/2 md:right-24 flex items-center justify-center size-12 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 text-white z-10 ">
//           <ChevronRight size={24}
//            />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MoviesSlider;
// import React, { useEffect, useRef, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useContentStore } from "../store/content";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import ReactPlayer from "react-player";
// import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
// import { formatReleaseDate } from "../utils/dateFunctions";
// import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

// const WatchPage = () => {
//   const { id } = useParams();
//   const [trailers, setTrailers] = useState([]);
//   const [currentTrailerId, setCurrentTrailerId] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [content, setContent] = useState({});
//   const { contentType } = useContentStore();
//   const [similarContent, setSimilarContent] = useState([]);
//   const sliderRef = useRef(null);
//   //   console.log(params);
//   useEffect(() => {
//     const getTrailers = async () => {
//       try {
//         const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
//         setTrailers(res.data.trailers);
//       } catch (error) {
//         if (error.message.includes("404")) {
//           console.log("No trailers found");
//           setTrailers([]);
//         } else {
//           console.error("Error fetching trailers:", error);
//         }
//       }
//     };
//     getTrailers();
//   }, [contentType, id]);
//   useEffect(() => {
//     const getSimilarContents = async () => {
//       try {
//         const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
//         // console.log("Response from similar API:", res.data.content); // Log the entire response object
//         setSimilarContent(res?.data?.content); //instead of similar we used content
//       } catch (error) {
//         if (error.message.includes("404")) {
//           console.log("No similar content found");
//           setSimilarContent([]);
//         } else {
//           console.error("Error fetching trailers:", error);
//         }
//       }
//     };
//     getSimilarContents();
//   }, [contentType, id]);

//   useEffect(() => {
//     const getContentDetails = async () => {
//       try {
//         const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
//         setContent(res.data.content);
//       } catch (error) {
//         if (error.message.includes("404")) {
//           console.log("No details found");
//           setContent(null);
//         } else {
//           console.error("Error fetching details:", error);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     getContentDetails();
//   }, [contentType, id]);
//   const handleNext = () => {
//     if (currentTrailerId < trailers.length - 1) {
//       setCurrentTrailerId(currentTrailerId + 1);
//     }
//     // console.log("next");
//   };
//   const handlePrev = () => {
//     if (currentTrailerId > 0) {
//       setCurrentTrailerId(currentTrailerId - 1);
//     }
//     // console.log("prev");
//   };
//   const scrollLeft = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({
//         left: -sliderRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   };
//   const scrollRight = () => {
//     if (sliderRef.current) {
//       sliderRef.current.scrollBy({
//         left: sliderRef.current.offsetWidth,
//         behavior: "smooth",
//       });
//     }
//   };
//   if (loading) {
//     <div className="min-h-screen bg-black p-10">
//       <WatchPageSkeleton />
//     </div>;
//   }
//   if (!content) {
//     return (
//       <div className="bg-black text-white h-screen">
//         <div className="max-w-6xl mx-auto">
//           <Navbar />
//           <div className="text-center mx-auto px-4 py-8 h-full mt-40">
//             <h2 className="text-2xl sm:text-5xl font-bold text-balance">
//               Content not found
//             </h2>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // console.log("trailers", trailers);
//   //   console.log("similar", similarContent);
//   //   console.log("content", content);

//   return (
//     <div className="bg-black pt-14 min-h-screen text-white ">
//       <div className="mx-auto conatiner px-4 py-8 h-full">
//         <Navbar />
//         {trailers.length > 0 && (
//           <div className="flex justify-between items-center mb-4 ">
//             <button
//               className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
//                 currentTrailerId === trailers.length - 1
//                   ? " cursor-not-allowed opacity-50"
//                   : ""
//               }`}
//               disabled={currentTrailerId === 0}
//               onClick={handlePrev}
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <button
//               className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
//                 currentTrailerId === trailers.length - 1
//                   ? " cursor-not-allowed opacity-50"
//                   : ""
//               }`}
//               disabled={currentTrailerId === trailers.length - 1}
//               onClick={handleNext}
//             >
//               <ChevronRight size={24} />
//             </button>
//           </div>
//         )}
//         <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
//           {trailers.length > 0 && (
//             <ReactPlayer
//               url={`https://www.youtube.com/watch?v=${trailers[currentTrailerId].key}`}
//               controls={true}
//               width="90%"
//               height="80%"
//               className="mx-auto overflow-hidden rounded-lg "
//             />
//           )}
//           {trailers.length === 0 && (
//             <h2 className="text-xl text-center mt-60">
//               No trailers available for
//               <span className="font-bold text-red-600 ">
//               {" "}  {content?.title || content?.name}
//               </span>
//             </h2>
//           )}
//         </div>
//         {/* movie details */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto">
//           <div className="mb-4 md:mb-0">
//             <h2 className="md:text-5xl text-2xl font-bold text-balance">
//               {content?.title || content?.name}
//             </h2>
//             <p className="mt-2 text-sm md:text-lg">
//               {formatReleaseDate(
//                 content?.release_date || content?.first_air_date
//               )}{" "}
//               |{" "}
//               {content?.adult ? (
//                 <span className="text-red-600">18+</span>
//               ) : (
//                 <span className="text-green-600">PG-13</span>
//               )}
//             </p>
//             <p className="mt-4 text-sm md:text-lg">{content?.overview}</p>
//           </div>
//           <img
//             src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
//             alt="poster image"
//             className="max-h-[600px] object-contain w-[100%] width-poster rounded-md"
//           />
//         </div>
//         {similarContent.length > 0 && (
//           <div className="mt-12 max-w-5xl mx-auto relative">
//             <h3 className="text-2xl font-bold mb-4">
//               Similar {contentType === "movie" ? "Movies" : "TV Shows"}
//             </h3>
//             <div
//               className="flex overflow-x-scroll gap-4 scrollbar-hide pb-4 group"
//               ref={sliderRef}
//             >
//               {similarContent.map((content) => {
//                 if (content.poster_path === null) {
//                   return null;
//                 }
//                 return (
//                   <Link
//                     key={content.id}
//                     to={`/watch/${content.id}`}
//                     className="w-52 flex-none"
//                   >
//                     <img
//                       src={SMALL_IMG_BASE_URL + content?.poster_path}
//                       alt="Poster path"
//                       className="w-full h-auto rounded-md"
//                     />
//                     <h4 className="text-lg mt-2 font-semibold">
//                       {content.title || content.name}
//                     </h4>
//                   </Link>
//                 );
//               })}
//               <ChevronRight
//                 className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
// 										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
// 										 bg-red-600 text-white rounded-full"
//                 onClick={scrollRight}
//               />
//               <ChevronLeft
//                 className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0
// 								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600
// 								text-white rounded-full"
//                 onClick={scrollLeft}
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WatchPage;
// import { useState } from "react";
// import { useContentStore } from "../store/content";
// import Navbar from "../components/Navbar";
// import { Search } from "lucide-react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";

// const SearchPage = () => {
//     const {user}= useAuthStore()
  
//   const [activeTab, setActiveTab] = useState("movie");
//   const [searchTerm, setSearchTerm] = useState("");

//   const [results, setResults] = useState([]);
//   const { setContentType } = useContentStore();

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     tab === "movie" ? setContentType("movie") : setContentType("tv");
//     setResults([]);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
//       setResults(res.data.content);
//     } catch (error) {
//       if (error.response.status === 404) {
//         toast.error(
//           "Nothing found, make sure you are searching under the right category"
//         );
//       } else {
//         toast.error("An error occurred, please try again later");
//       }
//     }
//   };

//   return (
//     <div className="bg-black min-h-screen pt-32 text-white">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center gap-3 mb-4">
//           <button
//             className={`py-2 px-4 rounded ${
//               activeTab === "movie" ? "bg-[#3ba9ed]" : "bg-gray-800"
//             } hover:bg-red-700`}
//             onClick={() => handleTabClick("movie")}
//           >
//             Movies
//           </button>
//           <button
//             className={`py-2 px-4 rounded ${
//               activeTab === "tv" ? "bg-[#3ba9ed]" : "bg-gray-800"
//             } hover:bg-red-700`}
//             onClick={() => handleTabClick("tv")}
//           >
//             TV Shows
//           </button>
//           <button
//             className={`py-2 px-4 rounded ${
//               activeTab === "person" ? "bg-[#3ba9ed]" : "bg-gray-800"
//             } hover:bg-red-700`}
//             onClick={() => handleTabClick("person")}
//           >
//             Person
//           </button>
//         </div>

//         <form
//           className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
//           onSubmit={handleSearch}
//         >
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder={"Search for a " + activeTab}
//             className="w-full p-2 rounded bg-gray-800 text-white"
//           />
//           <button className="bg-[#3ba9ed] hover:bg-red-700 text-white p-2 rounded">
//             <Search className="size-6" />
//           </button>
//         </form>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {results.map((result) => {
//             if (!result.poster_path && !result.profile_path) return null;

//             return (
//               <div key={result.id} className="bg-gray-800 p-4 rounded">
//                 {activeTab === "person" ? (
//                     // TODO
//                   <Link to={`/person/${result.id}`} className="flex flex-col items-center">
//                     <img
//                       src={ORIGINAL_IMG_BASE_URL + result.profile_path}
//                       alt={result.name}
//                       className="max-h-96 rounded mx-auto"
//                     />
//                     <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
//                   </Link>
//                 ) : (
//                   <Link
//                     to={"/watch/" + result.id}
//                     onClick={() => {setContentType(activeTab)}}
//                   >
//                     <img
//                       src={ORIGINAL_IMG_BASE_URL + result.poster_path}
//                       alt={result.title || result.name}
//                       className="w-full h-auto rounded"
//                     />
//                     <h2 className="mt-2 text-xl font-bold">
//                       {result.title || result.name}
//                     </h2>
//                   </Link>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SearchPage;
// import { useState } from "react";
// import { useContentStore } from "../store/content";
// import Navbar from "../components/Navbar";
// import { Search } from "lucide-react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
// import { Link } from "react-router-dom";
// import { useAuthStore } from "../store/authUser";
// import { motion } from "framer-motion"; // Import Framer Motion

// const SearchPage = () => {
//   const { user } = useAuthStore();
//   const [activeTab, setActiveTab] = useState("movie");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const { setContentType } = useContentStore();

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     tab === "movie" ? setContentType("movie") : setContentType("tv");
//     setResults([]);
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
//       setResults(res.data.content);
//     } catch (error) {
//       if (error.response?.status === 404) {
//         toast.error(
//           "Nothing found, make sure you are searching under the right category"
//         );
//       } else {
//         toast.error("An error occurred, please try again later");
//       }
//     }
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.2 }, // Stagger appearance of children by 0.2 seconds
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="bg-black min-h-screen pt-32 text-white">
//       <Navbar />
//       <div className="container mx-auto px-4 py-8">
//         <div className="flex justify-center gap-3 mb-4">
//           <button
//             className={`py-2 px-4 rounded ${
//               activeTab === "movie" ? "bg-[#3ba9ed]" : "bg-gray-800"
//             } hover:bg-red-700`}
//             onClick={() => handleTabClick("movie")}
//           >
//             Movies
//           </button>
//           <button
//             className={`py-2 px-4 rounded ${
//               activeTab === "tv" ? "bg-[#3ba9ed]" : "bg-gray-800"
//             } hover:bg-red-700`}
//             onClick={() => handleTabClick("tv")}
//           >
//             TV Shows
//           </button>
//           <button
//             className={`py-2 px-4 rounded ${
//               activeTab === "person" ? "bg-[#3ba9ed]" : "bg-gray-800"
//             } hover:bg-red-700`}
//             onClick={() => handleTabClick("person")}
//           >
//             Person
//           </button>
//         </div>

//         <form
//           className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
//           onSubmit={handleSearch}
//         >
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder={"Search for a " + activeTab}
//             className="w-full p-2 rounded bg-gray-800 text-white"
//           />
//           <button className="bg-[#3ba9ed] hover:bg-red-700 text-white p-2 rounded">
//             <Search className="size-6" />
//           </button>
//         </form>

//         <motion.div
//           className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {results.map((result) => {
//             if (!result.poster_path && !result.profile_path) return null;

//             return (
//               <motion.div
//                 key={result.id}
//                 className="bg-gray-800 p-4 rounded"
//                 variants={itemVariants}
//               >
//                 {activeTab === "person" ? (
//                   <Link
//                     to={`/person/${result.id}`}
//                     className="flex flex-col items-center "
//                   >
//                     <img
//                       src={ORIGINAL_IMG_BASE_URL + result.profile_path}
//                       alt={result.name}
//                       className="max-h-60 md:max-h-[96] rounded mx-auto"
//                     />
//                     <h2 className="mt-2 text-base md:text-xl text-center font-bold">{result.name}</h2>
//                   </Link>
//                 ) : (
//                   <Link
//                     to={"/watch/" + result.id}
//                     onClick={() => {
//                       setContentType(activeTab);
//                     }}
//                   >
//                     <img
//                       src={ORIGINAL_IMG_BASE_URL + result.poster_path}
//                       alt={result.title || result.name}
//                       className="w-full h-auto rounded"
//                     />
//                     <h2 className="mt-2 text-xl font-bold">
//                       {result.title || result.name}
//                     </h2>
//                   </Link>
//                 )}
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;