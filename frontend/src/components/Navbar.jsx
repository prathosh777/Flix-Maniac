import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Search, Menu } from "lucide-react";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user, logout } = useAuthStore();
  const { contentType, setContentType } = useContentStore();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsNavbarVisible(false); 
      } else {
        setIsNavbarVisible(true); 
      }
      setLastScrollY(currentScrollY);
    }
  };
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div>
      {user ? (
        <>
          <motion.header
            className={`max-w-5xl  mx-auto flex flex-wrap items-center justify-between  p-4 h-20 rounded-full fixed top-0 left-0 right-0 bg-black z-50`}
            initial={{ y: 0 }} 
            animate={{ y: isNavbarVisible ? 0 : -100 }} 
            transition={{ type: "spring", stiffness: 300, damping: 30 }} 
          >
            <div className="sm:hidden">
              <Menu
                className="size-6 cursor-pointer"
                onClick={toggleMobileMenu}
              />
            </div>
            <div className="flex items-center gap-10">
              <Link to="/">
                <img
                  src="/Flix-shadow.png"
                  alt="Flix Maniac Logo"
                  className="md:w-40 w-32 ml-5  items-center"
                />
              </Link>

              <div className="hidden  sm:flex gap-10 justify-center items-center">
                <Link
                  to="/"
                  className="hover:underline"
                  onClick={() => setContentType("movie")}
                >
                  Movies
                </Link>
                <Link
                  to="/"
                  className="hover:underline"
                  onClick={() => setContentType("tv")}
                >
                  TV Shows
                </Link>
                <Link
                  to="/history"
                  className="hover:underline"
                  onClick={() => setContentType("search")}
                >
                  Search History
                </Link>
              </div>
            </div>
            <div className="flex gap-7 items-center">
              <Link to="/search">
                <Search className="size-6 cursor-pointer" />
              </Link>
              <img
                src={user.image}
                alt="Avatar"
                className="h-8 rounded-full cursor-pointer"
              />
              <LogOut
                className="size-6 signout cursor-pointer"
                onClick={logout}
              />
            </div>
          </motion.header>

          {isMobileMenuOpen && (
            <div
              className="w-[80%] absolute left-1/2 transform -translate-x-1/2 text-center sm:hidden mt-0 z-50 bg-black border rounded border-gray-800"
              style={{ top: "5rem" }} 
            >
              <Link
                to="/"
                className="block hover:underline p-2"
                onClick={() => {
                  toggleMobileMenu();
                  setContentType("movie");
                }}
              >
                Movies
              </Link>
              <Link
                to="/"
                className="block hover:underline p-2"
                onClick={() => {
                  toggleMobileMenu();
                  setContentType("tv");
                }}
              >
                TV Shows
              </Link>
              <Link
                to="/history"
                className="block hover:underline p-2"
                onClick={toggleMobileMenu}
              >
                Search History
              </Link>
              <Link
                className="block hover:underline p-2 lg:hidden"
                onClick={logout}
              >
                Logout
              </Link>
            </div>
          )}
        </>
      ) : (
        <motion.header
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto flex flex-wrap items-center justify-between mb-5 p-4 h-20 relative z-50"
        >
          <Link className="flex" to={"/"}>
            <img
              className="md:w-40 w-28"
              src="/Flix-shadow.png"
              alt="Flix Maniac logo"
            />
          </Link>
          <div>
            <Link
              to={"/login"}
              className="text-white font-semibold bg-[#3077a3] py-1 px-2 rounded"
            >
              Sign In
            </Link>
            <Link
              to={"/signup"}
              className="text-white font-semibold w-[75px] bg-[#3077a3] py-1 ml-4 px-2 rounded"
            >
              Sign Up
            </Link>
          </div>
        </motion.header>
      )}
    </div>
  );
};

export default Navbar;
