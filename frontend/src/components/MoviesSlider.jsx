
import React, { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import {  SMALL_IMG_BASE_URL } from "../utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MoviesSlider = ({ category }) => {
  const { contentType } = useContentStore();
  const [content, setContent] = useState([]);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef(null);
  const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";
  const formattedCategoryName =
    category.replaceAll("_", " ")[0].toUpperCase() +
    category.replaceAll("_", " ").slice(1);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [contentType, category]);

  return (
    <div
      className="text-white bg-black relative px-5 md:px-20"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h2 className="text-2xl font-bold mb-4">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item) => (
          <Link
            to={`/watch/${item.id}`}
            className="md:min-w-[200px] p-4 min-w-[150px] relative group"
            key={item.id} onClick={"#play"}
          >
            <motion.div
              className="rounded-lg overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }} 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }} 
            >
              <img
                src={SMALL_IMG_BASE_URL + item?.poster_path}
                alt="Movie image"
                className="rounded-lg transition-transform duration-300 ease-in-out "
              />
            </motion.div>
           
          </Link>
        ))}
      </div>
      {showArrows && (
        <div>
          <motion.button
            onClick={scrollLeft}
            className="absolute left-5 top-1/2 -translate-y-1/2 md:left-24 flex items-center justify-center size-12 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            onClick={scrollRight}
            className="absolute right-5 top-1/2 -translate-y-1/2 md:right-24 flex items-center justify-center size-12 rounded-full bg-white bg-opacity-50 hover:bg-opacity-75 text-white z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default MoviesSlider;
