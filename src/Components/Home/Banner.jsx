import Lottie from "lottie-react";
import familyWithPets from "./familyWithPets.json";
import './style.css'

const Banner = () => {
  return (
    <div
      className="relative w-full pt-16 mx-auto shadow-lg flex items-center justify-between bg-cover bg-center"
      style={{
        height: "90vh",
        backgroundImage: "url('https://i.ibb.co.com/wgHfmZV/photo-1571325654970-9c00c5432fcb-1.jpg')", // Replace with your background image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: "rgba(0,0,0,0.6)", // Slight overlay for better text visibility
      }}
    >
      {/* Left Section: Welcome Message */}
      <div className="w-1/2 pl-10 pr-5 text-white z-10 space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fadeIn">
          Welcome to <span className="text-yellow-500">Pet Haven</span>
        </h1>
        <p className="text-xl md:text-2xl leading-relaxed animate-fadeIn delay-200">
          Find your perfect companion and give a loving home to a pet in need.
        </p>
        <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-lg font-semibold rounded-full shadow-lg animate-fadeIn delay-400">
          Get Started
        </button>
      </div>

      {/* Right Section: Lottie Animation */}
      <div className="w-1/2 flex justify-center items-center">
        <Lottie
          animationData={familyWithPets}
          className="w-full max-w-lg h-auto animate-slideIn"
        />
      </div>
    </div>
  );
};

export default Banner;
