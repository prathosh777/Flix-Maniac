import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        setSearchHistory(res.data.content);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      setSearchHistory((prev) => prev.filter((item) => item.id !== entry.id));

      await axios.delete(`/api/v1/search/history/${entry.id}`);

      toast.success("Search item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen pt-32 text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }


return (
  <div className="bg-black text-white min-h-screen">
    <Navbar />

    <div className="max-w-6xl mx-auto px-4 pt-32">
      <h1 className="text-3xl font-bold mb-8">Search History</h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {searchHistory.map((entry) => (
            <motion.div
              key={entry.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-gray-800 p-4 rounded flex items-start"
            >
              <Link 
                to={entry.searchType === 'person' ? `/person/${entry.id}` : `/watch/${entry.id}`} 
                className="flex items-start"
              >
                <img
                  src={SMALL_IMG_BASE_URL + entry.image}
                  alt={entry.title + ' image'}
                  className="size-16 rounded-full object-cover mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-white text-lg">
                    {entry.title.length > 20
                      ? entry.title.slice(0, 22) + "..."
                      : entry.title}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
              </Link>

              <span
                className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                  entry.searchType === "movie"
                    ? "bg-red-600"
                    : entry.searchType === "tv"
                    ? "bg-blue-600"
                    : "bg-green-600"
                }`}
              >
                {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
              </span>

              <Trash
                className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                onClick={() => handleDelete(entry)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  </div>
);

};

export default SearchHistoryPage;
