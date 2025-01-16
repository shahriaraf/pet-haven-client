import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './Provider/Authprovider';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#6d165D]/90 backdrop-blur-sm shadow-lg' : 'bg-[#6d165D]'
      } text-white`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://i.ibb.co.com/nLwLNqp/pethavenproject-logo-202-500x500-1.png"
            className="h-14"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Pet<span className="text-[#ECA511] font-bold">H</span>aven
          </span>
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            // Show profile photo and dropdown when logged in
            <div className="relative">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex text-sm bg-gray-800 rounded-full"
                aria-expanded={dropdownOpen ? 'true' : 'false'}
              >
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.photoURL || '/default-profile.jpg'} // Replace with user's photo URL
                  alt="user photo"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white text-[#6d165D] p-3 rounded-md shadow-lg">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/user-dashboard"
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
          ) : ""}
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
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
            {
              !user? <>
               <div className="flex space-x-4">
              <Link to="/login" className="text-white hover:underline hover:text-black">
                Login
              </Link>
              <Link to="/register" className="text-white hover:underline hover:text-black">
                Sign Up
              </Link>
            </div>
              </> : ""
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
