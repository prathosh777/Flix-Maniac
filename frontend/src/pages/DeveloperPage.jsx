import React from "react";
import Carousel from "../components/Carousal";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authUser";
import { motion } from "framer-motion";

const DeveloperPage = () => {
  const { user } = useAuthStore();

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-black  text-white">
     
        <div>
          <Navbar />
          <div className={`${user? "pt-28" :"pt-0"} relative bg-black text-white min-h-screen flex flex-col justify-between`}>
            <motion.div
              className="flex-grow w-full  md:text-lg text-base mx-auto md:px-20 px-10 py-8"
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <h2 className="md:text-4xl text-xl font-bold mb-8" id="developer">
                Developed By
              </h2>
              <p className="mb-4">
                Flix Maniac is created by Prathosh Kumar, a fresh and passionate
                MERN stack developer. With a love for movies and TV shows,
                Prathosh built this platform to bring the best of entertainment
                to you.
              </p>

              <h2 className="md:text-4xl text-xl font-bold mb-8">About me</h2>
              <p className="mb-4">
                Hello, my name is Prathosh. I am a recent graduate and the sole
                developer behind Flix Maniac. With a profound passion for
                movies, TV shows, and all forms of entertainment, I embarked on
                the journey to create Flix Maniac. This platform is designed to
                consolidate all the features and content that avid entertainment
                enthusiasts would desire.
                <br className="mb-4" /> At Flix Maniac, I strive to deliver a
                comprehensive and enjoyable experience, providing the latest
                reviews, detailed synopses, and a user-friendly system to track
                your viewing history. The creation of this platform has been an
                immensely rewarding experience, and I am excited to share it
                with fellow fans of the entertainment world.{" "}
                <br className="mb-4" /> I hope you find Flix Maniac to be a
                valuable and enjoyable resource.
              </p>
              <div className="mt-8">
                <h2 className="md:text-4xl text-xl font-bold mb-8">
                  Built with
                </h2>
                <Carousel />
              </div>
            </motion.div>
          </div>
        </div>
       
    </div>
  );
};

export default DeveloperPage;
