import { motion } from "framer-motion";
import './style.css'

const Banner = () => {
  return (
    <div
      className="relative w-full pt-16 mx-auto shadow-lg flex items-center justify-between bg-cover bg-center"
      style={{
        height: "110vh",
        backgroundImage: "url('https://gfxpartner.com/pawfy/inc/assets/images/hero-img-2.png')", // Replace with your background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.3)", // Slight overlay for better text visibility
      }}
    >
      <div className="md:w-1/2 w-full pl-10 pr-5 text-white z-10 space-y-6">
      {/* Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold leading-tight"
        initial={{ x: 700, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        Welcome to <span className="text-yellow-500">Pet Haven</span>
      </motion.h1>

      {/* Paragraph */}
      <motion.p
        className="text-xl md:text-2xl leading-relaxed"
        initial={{ y: 700, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
      >
        Find your perfect companion and give a loving home to a pet in need.
      </motion.p>

      {/* Button */}
      <motion.button
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-lg font-semibold rounded-full shadow-lg"
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 2, ease: "easeOut" }}
      >
        Get Started
      </motion.button>
    </div>

      {/* Right Section: Lottie Animation */}
      <div className="hidden w-1/2 md:flex justify-center items-center">
      
       
      </div>
    </div>
  );
};

export default Banner;
