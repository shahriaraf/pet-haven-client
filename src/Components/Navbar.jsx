import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Provider/Authprovider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        drawerOpen &&
        !e.target.closest(".drawer") &&
        !e.target.closest(".drawer-toggle")
      ) {
        closeDrawer();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [drawerOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#6d165D] shadow-lg" : "bg-[#6d165D]"
      } text-white`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo & Drawer Button */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDrawer}
            className="text-white text-xl md:hidden drawer-toggle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg>
          </button>
          <a href="/" className="flex items-center">
            <img
              src="https://i.ibb.co.com/nLwLNqp/pethavenproject-logo-202-500x500-1.png"
              className="h-12 me-3"
              alt="PetHaven Logo"
            />
            <span className="self-center hidden md:inline text-2xl font-bold text-white">
              Pet<span className="text-[#ECA511]">H</span>aven
            </span>
          </a>
        </div>

        {/* Nav Items - Desktop */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <ul className="flex space-x-8 text-lg uppercase font-semibold text-white">
            <li>
              <Link to="/" className="hover:underline hover:text-[#ECA511]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/petlist" className="hover:underline hover:text-[#ECA511]">
                Petlist
              </Link>
            </li>
            <li>
              <Link to="/donation" className="hover:underline hover:text-[#ECA511]">
                Donation Campaigns
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login" className="hover:underline hover:text-[#ECA511]">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="hover:underline hover:text-[#ECA511]"
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>

        {/* Profile & Logout */}
        <div className="flex items-center space-x-4">
          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex text-sm bg-gray-800 rounded-full"
              >
                <img
                  className="w-10 h-10 md:w-12 md:h-12 border-2 border-[#ECA511] rounded-full"
                  src={user.photoURL || "/default-profile.jpg"}
                  alt="user"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute top-12 right-0 bg-white text-[#6d165D] p-3 rounded-md shadow-lg">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm bg-[#ECA511] font-semibold hover:bg-[#ad7804] rounded-lg"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={signOutUser}
                        className="block w-full px-4 py-2 text-sm bg-red-600 font-semibold hover:bg-red-700 rounded-lg"
                      >
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex ${
          drawerOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`w-64 bg-black h-full shadow-lg p-5 flex flex-col transform ${
            drawerOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 drawer`}
        >
          {/* Close Button */}
          <button
            className="self-end text-gray-400 text-xl"
            onClick={closeDrawer}
          >
            ✖
          </button>

          {/* Mobile Menu */}
          <ul className="space-y-4 mt-5 uppercase text-lg text-amber-800 font-semibold">
            <li>
              <Link to="/" onClick={closeDrawer}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/petlist" onClick={closeDrawer}>
                Petlist
              </Link>
            </li>
            <li>
              <Link to="/donation" onClick={closeDrawer}>
                Donation Campaigns
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login" onClick={closeDrawer}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={closeDrawer}>
                    Signup
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
