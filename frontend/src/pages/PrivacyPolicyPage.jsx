import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const { user } = useAuthStore();

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-black text-white">
       <div className=""><Navbar /></div>
     
      <div className={`${user? "pt-28" :"pt-0"} relative bg-black text-white min-h-screen flex flex-col justify-between`}>
        <motion.div
          className="flex-grow max-w-6xl md:text-lg text-base mx-auto md:px-20 px-10 py-8"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          transition={{ duration: 0.75, ease: "easeInOut" }}
        >
          <h1 className="md:text-4xl text-xl pt-15 font-bold mb-8" id="privacy">
            Privacy Policy
          </h1>

          <h2 className="md:text-3xl text-lg font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to Flix Maniac. As a straightforward and user-friendly
            platform, we prioritize your convenience and ease of use.
          </p>

          <h2 className="md:text-3xl text-lg font-bold mb-4">
            Information We Collect
          </h2>
          <p className="mb-4">
            Flix Maniac does not actively collect personal information from its
            users. Any data that may be passively collected, such as usage
            statistics, is solely for improving the site experience and ensuring
            its smooth operation.
          </p>

          <h2 className="md:text-3xl text-lg font-bold mb-4">
            User Responsibility
          </h2>
          <p className="mb-4">
            Users are free to enjoy and use Flix Maniac as they see fit. We
            trust our users to navigate the platform responsibly and
            respectfully.
          </p>

          <h2 className="md:text-3xl text-lg font-bold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="mb-4">
            As the platform evolves, this Privacy Policy may be updated to
            reflect new features or user feedback. Any changes will be clearly
            posted on this page.
          </p>

          <h2 className="md:text-3xl text-lg font-bold mb-4">Contact Me</h2>
          <p className="mb-4">
            If you have any questions or concerns, feel free to reach out at{" "}
            <Link
              className="underline text-blue-500 hover:text-blue-700"
              to={"/contact"} onClick={"#contact"}
            >
              Contact me
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
