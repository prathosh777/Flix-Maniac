import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogOut, Search, Menu } from "lucide-react";
import { useAuthStore } from "../store/authUser.js";
import { useContentStore } from "../store/content.js";
import { motion } from "framer-motion";

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
        setIsNavbarVisible(false); // Scrolling down
      } else {
        setIsNavbarVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY); // Update last scroll position
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        className=" max-w-5xl mx-auto flex flex-wrap items-center justify-between mb-5 p-4 h-20 rounded-full fixed top-0 left-0 right-0 bg-black z-50"
        initial={{ y: 0 }} // Start position
        animate={{ y: isNavbarVisible ? 0 : -100 }} // Slide out when not visible
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Animation properties
      >
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
        <div className="flex items-center gap-10">
          <Link to="/">
            <img
              src="/Flix.png"
              alt="Flix Maniac Logo"
              className="w-32 ml-5 sm:w-40 items-center"
            />
          </Link>

          <div className="hidden  sm:flex gap-10 justify-center items-center">
            <Link
              to="/"
              className="hover:underline"
              onClick={() => setContentType("movie")}
            >
              Movies
              {/* <img src="/movies.png" className="bright" width={"10px"} alt="" /> */}
            </Link>
            <Link
              to="/"
              className="hover:underline"
              onClick={() => setContentType("tv")}
            >
              TV Shows
              {/* <img src="/television.png" className="bright" width={"25px"} alt="" /> */}
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
          <LogOut className="size-6 signout cursor-pointer" onClick={logout} />
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {/* {isMobileMenuOpen && (
        <div className="w-[80%] items-center top-20 absolute left-0 text-center sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
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
            to="/login"
            className="block hover:underline p-2 lg:hidden"
            onClick={logout}
          >
            Logout
          </Link>
        </div>
      )} */}

      {isMobileMenuOpen && (
        <div
          className="w-[80%] absolute left-1/2 transform -translate-x-1/2 text-center sm:hidden mt-0 z-50 bg-black border rounded border-gray-800"
          style={{ top: "5rem" }} // Adjust top to match the navbar height
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
  );
};

export default Navbar;
