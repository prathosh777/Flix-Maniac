
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/signup?email=${email}`);
  };

  return (
    <div className="hero-bg-2 relative">
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between mb-5 p-4 h-20 relative z-50">
        <Link className="flex" to={"/"}>
          <img className="w-40" src="/Flix-shadow.png" alt="Flix Maniac logo" />
        </Link>
        <Link to={"/login"} className="text-white bg-[#3077a3] py-1 px-2 rounded">
          Sign In
        </Link>
      </header>
      
      <div className="flex flex-col items-center justify-center text-center px-8 py-40 text-white max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="text-3xl md:text-6xl font-bold mb-4"
        >
          Infinite entertainment, endless fun.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:text-lg text-sm mb-4 px-8"
        >
          Watch anywhere, anytime no excuses, just pure entertainment, no matter where you are!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="mb-4 m-8 md:text-lg text-sm"
        >
          "Can’t wait to start watching? Enter your email now to join.
        </motion.p>
        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            className="p-2 rounded flex-1  bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={'#signup'} className="bg-[#3077a3]  text-base lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className="w-8 md:w-10" />
          </button>
        </form>
      </div>

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          <div className="flex-1 px-10 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-2xl md:text-5xl font-extrabold mb-4"
            >
              Enjoy on your TV
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="text-sm md:text-xl"
            >
              Watch on Smart TVs, Chromecast, Apple TV, Mobiles and more.
            </motion.p>
          </div>
          <div className="flex-1 relative">
            <img src="/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/onepunchmanvid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" />

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          <div className="flex-1">
            <div className="relative">
              <img
                src="/breakingbad1.webp"
                alt="stranger things image"
                className="mt-4"
              />
              <div className="flex  item-center md:w-[50%] w-[77%] gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black lg:w-1/2 h-[4.5em] md:h-24 border border-slate-500 rounded-md px-2">
                <img
                  src="/Breakingbad.webp"
                  alt="Breaking bad image"
                  style={{ backgroundSize: "contain" }}
                  height={"80%"}
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Breaking Bad
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img src="/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 md:text-left text-center">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-2xl md:text-5xl font-extrabold mb-4"
            >
              Download your shows to watch offline
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false }}
              className="text-sm md:text-xl"
            >
              Save your favourites easily and always have something to watch
            </motion.p>
          </div>
        </div>
      </div>
      <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" />

      <div className="p-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-2xl md:text-5xl font-extrabold mb-4"
            >
              Watch everywhere
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false }}
              className="text-sm md:text-xl"
            >
              Stream unlimited movies and TV shows on your phone, laptop, tablet, and TV.
            </motion.p>
          </div>
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="Device image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="salaar.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      <div className="h-2 w-full bg-[#5c5c5c]" aria-hidden="true" />

      <div className="p-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
          <div className="flex-1 relative">
            <img src="/kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="text-2xl md:text-5xl font-extrabold mb-4"
            >
              Watch with your kids
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false }}
              className="text-sm md:text-xl"
            >
              Watch your favourite movies and TV shows with your kids in a secure environment.
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;