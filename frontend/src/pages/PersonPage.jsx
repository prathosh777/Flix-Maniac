import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";
import { motion } from "framer-motion";

const PersonPage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [personRes, moviesRes] = await Promise.all([
          axios.get(`/api/v1/person/${id}/details`),
          axios.get(`/api/v1/person/${id}/credits`),
        ]);
        setPerson(personRes.data.content);
        setMovies(moviesRes.data.content || []);
      } catch (error) {
        console.error("Error fetching person data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container w-[80%] mx-auto px-4 py-8">
        {person ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:pt-16 pt-32 pb-10 md:text-5xl py-5 font-bold"
            >
              {person.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10"
            >
              <div className="flex-1">
                <img
                  src={ORIGINAL_IMG_BASE_URL + person.profile_path}
                  alt={person.name}
                  className="rounded-md max-h-[500px] md:max-h-[600px] object-cover w-[80%]"
                />
                <div className="mt-6 space-y-4">
                  {person.birthday && (
                    <div>
                      <h3 className="text-lg pb-1 font-semibold">Birthday</h3>
                      <p>{person.birthday}</p>
                    </div>
                  )}
                  {person.gender && (
                    <div>
                      <h3 className="text-lg pb-1 font-semibold">Gender</h3>
                      <p>{person.gender === 2 ? "Male" : "Female"}</p>
                    </div>
                  )}
                  {person.place_of_birth && (
                    <div>
                      <h3 className="text-lg pb-1 font-semibold">
                        Place of Birth
                      </h3>
                      <p>{person.place_of_birth}</p>
                    </div>
                  )}
                  {person.also_known_as?.length > 0 && (
                    <div>
                      <h3 className="text-lg pb-1 font-semibold">
                        Also Known As
                      </h3>
                      <div className="space-y-1">
                        {person.also_known_as.map((alias, index) => (
                          <p key={index}>{alias}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-4 space-y-6"
                >
                  {person.biography
                    ? person.biography
                        .split(/(?<=\.)\s+/)
                        .map((sentence, index) => (
                          <motion.p
                            key={index}
                            className="leading-relaxed text-sm md:text-lg"
                          >
                            {sentence}
                          </motion.p>
                        ))
                    : "No biography available"}
                </motion.div>
              </div>
            </motion.div>

            {movies.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 relative group"
              >
                <h3 className="text-2xl font-bold mb-4">Movies</h3>
                <div className="relative w-full">
                  <div
                    ref={sliderRef}
                    className="flex overflow-x-scroll p-5 gap-4 pb-4 scrollbar-hide"
                  >
                    {movies.map((movie) =>
                      movie.poster_path ? (
                        <Link
                          to={`/watch/${movie.id}`}
                          key={movie.id}
                          className="w-48 flex-none"
                        >
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={SMALL_IMG_BASE_URL + movie.poster_path}
                            alt={movie.title || "Movie Poster"}
                            className="rounded-md "
                          />
                        </Link>
                      ) : null
                    )}
                  </div>

                  <ChevronLeft
                    className="absolute top-1/2 -translate-y-1/2 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-white text-gray-500 rounded-full z-10"
                    onClick={scrollLeft}
                  />
                  <ChevronRight
                    className="absolute top-1/2 -translate-y-1/2 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-white text-gray-500 rounded-full z-10"
                    onClick={scrollRight}
                  />
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-bold">Person not found</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonPage;
