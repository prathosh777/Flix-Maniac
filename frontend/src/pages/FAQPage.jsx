import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import {useAuthStore} from "../store/authUser";
import { Link } from "react-router-dom";
const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
const {user}= useAuthStore();
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
  <div className="max-w-6xl mx-auto text-white  pt-2  m mb-40 ">
      <Navbar />
      <h2 className={`${user? "pt-28" :"pt-16"} text-3xl  font-bold text-center pb-5 mb-8`} id="faq">Frequently Asked Questions</h2>

      <div className="space-y-4 px-4">
        <motion.div
          className="bg-gray-800 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(0)}
          >
            <h3 className="text-xl font-semibold">What is Flix Maniac?</h3>
            <span>{activeIndex === 0 ? "-" : "+"}</span>
          </div>
          {activeIndex === 0 && (
            <motion.div
              className="mt-2 text-sm"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p>Flix Maniac is a platform where you can explore movies and TV shows with ease.</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="bg-gray-800 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(1)}
          >
            <h3 className="text-xl font-semibold">How do I search for movies or TV shows?</h3>
            <span>{activeIndex === 1 ? "-" : "+"}</span>
          </div>
          {activeIndex === 1 && (
            <motion.div
              className="mt-2 text-sm"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p>Simply use the search bar at the top of the page to find any movie or TV show.</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="bg-gray-800 p-4 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleFAQ(2)}
          >
            <h3 className="text-xl font-semibold">Do I need an account to use the site?</h3>
            <span>{activeIndex === 2 ? "-" : "+"}</span>
          </div>
          {activeIndex === 2 && (
            <motion.div
              className="mt-2 text-sm"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <p>Yes, you can not explore content without an account, but signing up will allow you to save your preferences.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQPage;
