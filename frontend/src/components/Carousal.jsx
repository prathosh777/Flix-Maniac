import { useRef } from "react";
import { motion } from "framer-motion";
import html from "../logos/HTML.png";
import css from "../logos/CSS.png";
import js from "../logos/JS.png";
import react from "../logos/React.png";
import tailwind from "../logos/tailwind-css.webp";
import framer from "../logos/framer-motion.svg";
import node from "../logos/Node-js.png";
import mongodb from "../logos/mongodb.png";
import left from "../logos/left.png";
import right from "../logos/right.png";
const carouselItems = [
  { id: 1, image: html, title: "HTML" },
  { id: 2, image: css, title: "CSS" },
  { id: 3, image: js, title: "JS" },
  { id: 4, image: react, title: "React" },
  { id: 5, image: mongodb, title: "MongoDB" },
  { id: 6, image: tailwind, title: "Tailwind CSS" },
  { id: 7, image: framer, title: "Framer Motion" },
  { id: 8, image: node, title: "Node JS" },
];

const Carousel = () => {
  const carouselRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollAmount = direction === left ? -300 : 300;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-[80vw]  md:h-[333px] bg-gray-300 text-black rounded-md">
      {/* Carousel Wrapper */}
      <div
        ref={carouselRef}
        className="flex overflow-x-scroll scrollbar-hide space-x-4 p-4"
      >
        {carouselItems.map((item) => (
          <motion.div
            key={item.id}
            className="min-w-[250px] w-[300px]  relative overflow-hidden bg-black rounded-lg shadow-lg cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            {/* Image */}
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full object-contain  h-[80%] "
              whileHover={{ opacity: 1 }}
            />

            {/* Overlay */}
            <div className="text-center bg-black bg-opacity-70 text-white p-2">
              <h3 className="text-lg font-bold">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => handleScroll(left)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full hover:size-12 "
      >
        &#9664;
      </button>
      <button
        onClick={() => handleScroll(right)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 p-2 rounded-full hover:size-12 "
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
