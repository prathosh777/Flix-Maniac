import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authUser";
import { Link } from "react-router-dom";


const ContactPage = () => {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_zehhwuy",
        "template_rhranf9",
        formData,
        "WEJFesRXefUHiJUhj"
      )
      .then((result) => {
        console.log(result.text);
        setIsSubmitted(true);
        setFormData({ user_name: "", user_email: "", message: "" });
      })
      .catch((error) => {
        console.error("Error sending email:", error.text);
      });
  };

  const formVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariant = {
    hover: {
      scale: 0.99,
      transition: { yoyo: 5 },
    },
    tap: { scale: 0.9 },
  };

  // const successVariant = {
  //   hidden: { opacity: 0 },
  //   visible: { opacity: 1, transition: { duration: 0.7 } },
  // };// instead of suvvesswe used toast

  return (
    <div className=" hero-bg-1 text-white h-[100vh]">
     
        <div>
          <Navbar />
          <div className={`${user? "pt-28" :"pt-0"} flex justify-center  items-center  mx-3`}>
            <div className="w-full max-w-md p-8 items-center bg-black/60 rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-6 text-center" id="contact">
                Contact Me
              </h1>
              {isSubmitted ? (
                <>
                  <div className="text-center">
                    Thank you for reaching out! We'll get back to you soon.
                  </div>
                  {/* {toast.success(
                    "Thank you for reaching out! We'll get back to you soon."
                  )} */}
                </>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  initial="hidden"
                  animate="visible"
                  variants={formVariant}
                  className="space-y-4"
                >
                  <motion.div className="">
                    <label
                      htmlFor="user_name"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      placeholder="Name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      className=" w-full p-2 border-gray-700 text-white border bg-black rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </motion.div>

                  <motion.div className="">
                    <label
                      htmlFor="user_email"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      placeholder="you@example.com"
                      value={formData.user_email}
                      onChange={handleChange}
                      className="block w-full p-2 border-gray-700 text-white border bg-black rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </motion.div>

                  <motion.div className="mx-auto items-center justify-center ">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Type your message here"
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full p-2 border-gray-700 text-white border bg-black rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    variants={buttonVariant}
                    whileHover="hover"
                    whileTap="tap"
                    className="flex  justify-center items-center w-full py-2 btncolor text-white font-bold rounded"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default ContactPage;
