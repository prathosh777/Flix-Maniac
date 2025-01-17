
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { motion } from "framer-motion";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const handleLogIn = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="h-screen w-full hero-bg-1">
      <motion.header
        className="max-w-8xl mx-auto flex items-center justify-between p-4"
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        transition={{ duration: 0.5 }}
      >
        <Link className="flex" to={"/"}>
          <img
            className="w-40"
            src="/Flix-shadow.png"
            alt="Flix Maniac logo"
          />
        </Link>
      </motion.header>
      <div className="flex justify-center items-center mt-20 mx-3">
        <motion.div
          className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md"
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-center text-white text-2xl font-bold mc-4">
            Login
          </h1>
          <form className="space-y-4" onSubmit={handleLogIn}>
            <div>
              <label
                htmlFor="email"
                className="font-medium text-sm text-gray-300 block"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="font-medium text-sm text-gray-300 block"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-mg bg-transparent text-white focus:outline-none focus:ring"
                placeholder="••••••••"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button className="w-full py-2 btncolor text-white font-semibold rounded-md">
              Sign In
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to={"/signup"} className="txtcolor">
              Sign Up
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LogInPage;