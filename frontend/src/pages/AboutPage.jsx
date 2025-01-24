import React from "react";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authUser";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const AboutPage = () => {
  const { user } = useAuthStore();
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-black text-white">
    
       <div className=""><Navbar /></div>

      <div className={` ${user? "pt-28" :"pt-0"} relative bg-black text-white min-h-screen flex flex-col justify-between`}>
      <motion.div
          className="flex-grow max-w-6xl md:text-lg text-base mx-auto md:px-20 px-10 py-8"
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <h2 className="md:text-4xl text-xl font-bold mb-8" id = "about">
            About Flix Maniac
          </h2>
          <p className="mb-4">
            Welcome to Flix Maniac, your ultimate destination for all things
            entertainment! Whether you're a movie buff, a TV series addict, or a
            celebrity enthusiast, Flix Maniac has got you covered. Powered by
            the comprehensive TMDB API, we bring you the latest and greatest in
            movies, TV shows, and celebrity news.
          </p>
          <p className="mb-4">
            At Flix Maniac, we believe in the magic of storytelling. From
            heart-pounding action movies to tear-jerking dramas, from
            binge-worthy TV series to behind-the-scenes celebrity insights, we
            have something for everyone. Our platform is designed to help you
            discover new favorites, stay updated with trending content, and dive
            deep into the world of entertainment.
          </p>
          <h2 className="md:text-4xl text-xl font-bold mb-8">
            Why choose Flix Maniac?
          </h2>
          <p className="mb-4">
            <span className="font-bold">Extensive Database:</span> With access
            to millions of movies and TV shows, you'll never run out of options.
          </p>
          <p className="mb-4">
            <span className="font-bold">User-Friendly Interface:</span> Navigate
            seamlessly through our easy-to-use platform and find what you love
            in no time.
          </p>
          <p className="mb-48">
            Join the Flix Maniac community today and embark on an unforgettable
            entertainment journey!
          </p>
      </motion.div>
        </div>
    </div>
  );
};

export default AboutPage;
