import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { motion } from "framer-motion";

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2 },
  },
};

const SearchPage = () => {
  const { user } = useAuthStore();

  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();
  const [loading, setLoading] = useState(false); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-32 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movie" ? "bg-[#3ba9ed]" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("movie")}
          >
            Movies
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-[#3ba9ed]" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-[#3ba9ed]" : "bg-gray-800"
            } hover:bg-red-700 `}
            onClick={() => handleTabClick("person")}
          >
            Person
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a " + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-[#3ba9ed] hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center h-64 text-lg text-white">
            Loading...
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: { opacity: 0 },
              animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
              exit: { opacity: 0 },
            }}
          >
            {results.map((result) => {
              if (!result.poster_path && !result.profile_path) return null;

              return (
                <motion.div
                  key={result.id}
                  className="bg-gray-800 p-4  rounded hover:scale-105 transition-transform duration-300 flex flex-col items-center"
                  variants={itemVariants}
                >
                  {activeTab === "person" ? (
                    <Link
                      to={`/person/${result.id}`}
                      className="flex flex-col  items-center"
                    >
                      <img
                        src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                        alt={result.name}
                        className="h-[250px] object-contain md:h-[330px] rounded mx-auto"
                      />
                      <h2 className="mt-2 text-xl font-bold text-center">
                        {result.name}
                      </h2>
                    </Link>
                  ) : (
                    <Link
                      to={"/watch/" + result.id}
                      onClick={() => {
                        setContentType(activeTab);
                      }}
                    >
                      <img
                        src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                        alt={result.title || result.name}
                        className="w-full h-[250px] object-contain md:h-[330px] rounded transition-transform duration-300 hover:scale-105"
                      />
                      <h2 className="mt-2 text-xl font-bold text-center">
                        {result.title || result.name}
                      </h2>
                    </Link>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
