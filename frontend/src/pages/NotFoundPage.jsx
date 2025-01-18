import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authUser";
const NotFoundPage = () => {
  const {user } = useAuthStore();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-black pb-10 min-h-screen text-white">
      {user ?( <div className="mt-32"><Navbar /></div> ) : (  <header className="max-w-8xl mx-auto flex items-center justify-between p-4">
                <Link className="flex" to={"/"}>
                  <img
                    className="w-40 "
                    src="/Flix-shadow.png"
                    alt="Flix Maniac logo"
                  />
                </Link>
                <div className="flex items-center space-x-4">
                  <Link
                    to={"/login"}
                    className="text-white w-[75px] bg-[#3077a3] py-1 px-2 rounded"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={"/signup"}
                    className="text-white w-[75px] bg-[#3077a3] py-1 px-2 rounded"
                  >
                    Sign Up
                  </Link>{" "}
                </div>
              </header>)}
      <div
        className="h-[60vh]  md:object-contain object-cover w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url('/404-error.jpg')` }}
      ></div>
      <motion.div
        className="text-center mt-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="md:text-7xl text-2xl font-semibold mb-4"
          variants={itemVariants}
        >
          Lost your way?
        </motion.h1>
        <motion.p className="md:text-xl text-base mb-6" variants={itemVariants}>
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </motion.p>
        <motion.div className="mt-6" variants={itemVariants}>
          <Link
            to={"/"}
            className="bg-white btncolor text-white py-2 px-4 rounded "
          >
            Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
