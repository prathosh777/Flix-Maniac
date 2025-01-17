import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-black text-white border-t border-gray-800">
      <div className="flex flex-col md:pl-0 pl-10 items-start md:items-center  justify-evenly m-5  md:flex-row py-6  md:py-0 md:px-8">
        <Link to="/about" onClick={"#about"} className="p-1 hover:underline">About</Link>
        <Link to="/developer" onClick={"#developer"} className="p-1 hover:underline">Built by</Link>
        <Link to="/contact" onClick={"#contact"} className="p-1 hover:underline">Contact</Link>
        <Link to="/privacy" onClick={"#privacy"} className="p-1 hover:underline">Privacy Policy</Link>
        <Link to="/faq" onClick={"#faq"} className="p-1 hover:underline">FAQ</Link>
      </div>
      <div className="bg-black text-white p-5 py-4 text-center">
        <p>&copy; 2025 Flix Maniac. All rigths reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
