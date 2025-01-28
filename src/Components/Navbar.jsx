import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Provider/Authprovider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer

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

  // Close the drawer when clicked outside
  const handleOutsideClick = (e) => {
    if (drawerOpen && !e.target.closest(".drawer") && !e.target.closest(".drawer-toggle")) {
      closeDrawer();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [drawerOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-[#6d165D]/90 shadow-lg" : "bg-[#6d165D]"
        } text-white`}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo and Hamburger Menu */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <button
            onClick={toggleDrawer}
            className="text-white text-xl md:hidden drawer-toggle"
          >
            ☰
          </button>
          <a href="https://flowbite.com/" className="flex items-center">
            <img src="https://i.ibb.co.com/nLwLNqp/pethavenproject-logo-202-500x500-1.png" className="h-14 me-3" alt="FlowBite Logo" />
            <span className="self-center hidden md:inline text-2xl font-semibold whitespace-nowrap dark:text-white"> Pet<span className='text-[#ECA511] font-bold'>H</span>aven</span>
          </a>
        </div>

        {/* Nav Items on large devices */}
        <div className="hidden md:flex items-center justify-center flex-grow">
          <ul className="flex space-x-8">
            <li>
              <Link to="/" className="text-white hover:underline hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link to="/petlist" className="text-white hover:underline hover:text-black">
                Petlist
              </Link>
            </li>
            <li>
              <Link to="/donation" className="text-white hover:underline hover:text-black">
                Donation Campaigns
              </Link>
            </li>
            {!user ? (
              <>
                <li>
                  <Link to="/login" className="text-white hover:underline hover:text-black">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:underline hover:text-black">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : ""}
          </ul>
        </div>

        {/* Profile Section */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex text-sm bg-gray-800 rounded-full"
                aria-expanded={dropdownOpen ? "true" : "false"}
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.photoURL || "/default-profile.jpg"}
                  alt="user photo"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white text-[#6d165D] p-3 rounded-md shadow-lg">
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

      {/* Drawer for small devices */}
      <div
        className={`fixed top-0 left-0 h-full w-1/2 bg-[#6d165D] text-white z-50 shadow-lg transform transition-transform duration-300 drawer ${drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <ul className="flex flex-col p-4 space-y-4">
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
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
