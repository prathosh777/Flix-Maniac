
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Info, Play } from "lucide-react";
import useToGetTrendingMovies from "../../hook/useToGetTrendingMovies.jsx";
import { MOVIE_CATEGORY, ORIGINAL_IMG_BASE_URL, TV_CATEGORY } from "../../utils/constants";
import { useContentStore } from "../../store/content";
import MoviesSlider from "../../components/MoviesSlider";
import { motion } from "framer-motion"; 

const HomeScreen = () => {
  const { trendingContent } = useToGetTrendingMovies();
  const { contentType } = useContentStore();
  const [imageLoading, setImageLoading] = useState(true);

  if (!trendingContent) {
    return (
      <div className="flex text-white relative h-screen">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 -z-10 shimmer" />
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="relative h-screen text-white"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }} 
      >
        <Navbar />
        {imageLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70 -z-10 shimmer" />
        )}
        <motion.img
          className="absolute left-0 top-0 w-full h-full object-cover -z-50 "
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="Hero image"
         
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute left-0 top-0 w-full h-full bg-black/50 -z-50" aria-hidden="true" />
        <div className="absolute left-0 top-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32 z-10">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <motion.div
            className="max-w-2xl"
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }} 
          >
            <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold ">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG-13"}
            </p>
            <p className="mt-4 text-lg ">
              {trendingContent?.overview.length > 200
                ? `${trendingContent?.overview.slice(0, 200)}...`
                : trendingContent?.overview}
            </p>
          </motion.div>
          <div className="flex mt-8">
            <Link
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center"
              to={`/watch/${trendingContent?.id}` } onClick={"#play"}
            >
              <Play  className="size-6 md:size-8 mr-2 fill-black" />
              Play
            </Link>
            <Link
              className="bg-gray-500/70 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex items-center"
              to={`/watch/${trendingContent?.id}`} onClick={"#moreinfo"}
            >
              <Info className="size-6 md:size-8 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </motion.div>
      <div className="flex flex-col gap-10 bg-black text-white py-10">
        {contentType === "movie"
          ? MOVIE_CATEGORY.map((category, index) => (
              <MoviesSlider key={`${category.id}-${index}`} category={category} />
            ))
          : TV_CATEGORY.map((category, index) => (
              <MoviesSlider key={`${category.id}-${index}`} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;