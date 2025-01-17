// import React from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// const NotFoundPage = () => {
//   return (
//     <div className=" bg-black min-h-screen text-white">
//       <Navbar />
//       <div
//         className="h-[60vh] bg-cover bg-center flex flex-col justify-center items-center text-white"
//         style={{ backgroundImage: `url('/404-error.jpg')` }}
//       >
       
//       </div>
//      <div className="text-center mt-8"> <Link to={"/"} className="bg-white btncolor text-white py-2 px-4 rounded ">
//           Home
//         </Link></div>
//       <main className="text-center pb-14 pt-7 z-10">
      
//         <h1 className="text-7xl font-semibold mb-4">Lost your way?</h1>
//         <p className=" text-xl">
//           Sorry, we can't find that page. You'll find lots to explore on the
//           home page.
//         </p>
//       </main>
//     </div>
//   );
// };

// export default NotFoundPage;
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="bg-black pt-28 pb-10 min-h-screen text-white">
      <Navbar />
      <div
        className="h-[60vh] md:object-contain object-cover w-full bg-cover bg-center flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: `url('/404-error.jpg')` }}
      ></div>
      <motion.div
        className="text-center mt-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-7xl font-semibold mb-4"
          variants={itemVariants}
        >
          Lost your way?
        </motion.h1>
        <motion.p
          className="text-xl mb-6"
          variants={itemVariants}
        >
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </motion.p>
        <motion.div
          className="mt-6"
          variants={itemVariants}
        >
          <Link to={"/"} className="bg-white btncolor text-white py-2 px-4 rounded ">
            Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
