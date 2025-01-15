import { useState, useEffect } from "react";

const movies = [
  {
    title: "Barger",
    image: "https://i.ibb.co.com/7YJ2sVw/images-27.jpg",
  },
  {
    title: "Pasta",
    image: "https://i.ibb.co.com/0KWLgj5/610x350-Photo-4-862-How-to-Make-CHICKEN-PASTA-Like-an-Italian-V1.jpg",
  },
  {
    title: "Grilled Chicken",
    image: "https://i.ibb.co.com/sCZZZzq/Grilled-Chicken-Recipe-5-1200.jpg",
  },
  {
    title: "Pizza",
    image: "https://i.ibb.co.com/k5X1Bww/images-28.jpg",
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000); // Change slides every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative w-full pt-16 mx-auto overflow-hidden shadow-lg">
      {/* Slider */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie, index) => (
          <div
            key={index}
            className="flex-none w-full relative bg-gray-900 text-white"
            style={{ height: "90vh" }} // Default height for larger screens
          >
            {/* Movie Image */}
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover "
            />
            {/* Movie Details */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
              <h2 className="text-xl md:text-3xl font-bold">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;