import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleaseDate } from "../utils/dateFunctions";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { motion } from "framer-motion";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [currentTrailerId, setCurrentTrailerId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const { contentType } = useContentStore();
  const [similarContent, setSimilarContent] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No trailers found");
          setTrailers([]);
        } else {
          console.error("Error fetching trailers:", error);
        }
      }
    };
    getTrailers();
  }, [contentType, id]);

  useEffect(() => {
    const getSimilarContents = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res?.data?.content);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No similar content found");
          setSimilarContent([]);
        } else {
          console.error("Error fetching trailers:", error);
        }
      }
    };
    getSimilarContents();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          console.log("No details found");
          setContent(null);
        } else {
          console.error("Error fetching details:", error);
        }
      } finally {
        setLoading(false);
      }
    };
    getContentDetails();
  }, [contentType, id]);

  const handleNext = () => {
    if (currentTrailerId < trailers.length - 1) {
      setCurrentTrailerId(currentTrailerId + 1);
    }
  };

  const handlePrev = () => {
    if (currentTrailerId > 0) {
      setCurrentTrailerId(currentTrailerId - 1);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black pt-14 min-h-screen text-white">
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />
        {trailers.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerId === 0 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentTrailerId === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                currentTrailerId === trailers.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentTrailerId === trailers.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailers.length > 0 && (
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailers[currentTrailerId].key}`}
              controls={true}
              width="90%"
              height="80%"
              className="mx-auto overflow-hidden rounded-lg"
            />
          )}
          {trailers.length === 0 && (
            <h2 className="text-xl text-center mt-60">
              No trailers available for
              <span className="font-bold text-red-600">
                {" "}
                {content?.title || content?.name}.
              </span>
              {" "}

              Please try again later
            </h2>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex flex-col md:flex-row items-center justify-between gap-20 max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <motion.h2 initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false }} className="md:text-5xl text-2xl font-bold text-balance">
              {content?.title || content?.name}
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false }} className="mt-2 text-sm md:text-lg">
              {formatReleaseDate(
                content?.release_date || content?.first_air_date
              )}{" "}
              |{" "}
              {content?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: false }}
              className="mt-4 text-sm md:text-lg"
            >
              {content?.overview}
            </motion.p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + content?.poster_path}
            alt="poster image"
            className="max-h-[600px] object-contain w-[100%] width-poster rounded-md"
          />
        </motion.div>

        {similarContent.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 max-w-5xl mx-auto relative"
          >
            <h3 className="text-2xl font-bold mb-4">
              Similar {contentType === "movie" ? "Movies" : "TV Shows"}
            </h3>
            <div
              className="flex overflow-x-scroll gap-4 scrollbar-hide pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) {
                  return null;
                }
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content?.poster_path}
                      alt="Poster path"
                      className="md:w-full w-[180px] h-[250px] md:h-[330px] rounded-md"
                    />
                    {/* <h4 className="text-lg mt-2 font-semibold">
                      {content.title > 20
                        ? content.title.slice(0, 20) + "..."
                        : content.title || content.name > 20
                        ? content.name.slice(0, 20) + "..."
                        : content.name}
                    </h4> */}
                    <h4 className="text-base mt-2 font-semibold">
                      {" "}
                      {content?.title &&
                      typeof content.title === "string" &&
                      content.title.length > 20
                        ? content.title.slice(0, 22) + "..."
                        : content?.name &&
                          typeof content.name === "string" &&
                          content.name.length > 20
                        ? content.name.slice(0, 22) + "..."
                        : content?.title ||
                          content?.name ||
                          "No title available"}
                    </h4>
                  </Link>
                );
              })}
              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
                                        opacity-[-50px]  transition-all duration-300 cursor-pointer
                                         bg-white text-gray-500 rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
                                group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-white 
                                text-gray-500 rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;
