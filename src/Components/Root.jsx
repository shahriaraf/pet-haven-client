import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useContext } from "react";
import { ThemeContext } from "./Provider/ThemeProvider";


const Root = () => {
  const { darkMode } = useContext(ThemeContext); // Access the dark mode state

  return (
    <div className={darkMode ? "dark-theme" : "light-theme"}> {/* Apply the theme */}
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;
