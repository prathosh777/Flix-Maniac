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
      <Navbar />
      <div
        className={`${user? "mt-32" :"mt-0"} h-[60vh]  md:object-contain object-cover w-full bg-cover bg-center flex flex-col justify-center items-center text-white`}
        style={{ backgroundImage: `url('/404-error.jpg')` }}
      ></div>
      <motion.div
        className="text-center "
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
