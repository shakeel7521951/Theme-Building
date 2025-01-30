import React, { useState, useEffect } from "react";
// import { FaCaretDown, FaBars } from "react-icons/fa"; // Import icons
import logoPic from "/admin/logoweb.png";
import logo from "/admin/logo.jpg";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const [isScrolled, setIsScrolled] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdownOnClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdownOnClickOutside);
    return () =>
      document.removeEventListener("click", closeDropdownOnClickOutside);
  }, []);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav
      className={`flex sticky top-0 items-center justify-between !px-4 !py-3 bg-black text-white shadow-md  z-10  ${
        isScrolled ? "bg-transparent" : "bg-black"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={logoPic}
          alt="Logo"
          className="w-[140px] h-auto object-contain"
        />
      </div>

      {/* Navigation Links (Centered) */}
      <div className="hidden md:flex gap-8 space-x-8 text-lg font-semibold">
        <Link to="/admin" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/admin/users" className="hover:text-gray-300">
          User
        </Link>
        <Link to="/admin/add-blog" className="hover:text-gray-300">
          Add Blogs
        </Link>
      </div>

      {/* Hamburger Menu Icon (Visible on small screens) */}
      <button
        className="text-white text-2xl md:hidden focus:outline-none"
        onClick={toggleMobileMenu}
      >
        {/* <FaBars /> */}
        <p>Open</p>
      </button>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#000] text-white transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <button
          className="self-end !m-4 text-white text-xl"
          onClick={toggleMobileMenu}
        >
          ✖
        </button>
        <div className="flex flex-col items-center !space-y-6 text-lg">
          <Link to="/admin" onClick={toggleMobileMenu}>
            Home
          </Link>
          <Link to="/admin/users" onClick={toggleMobileMenu}>
            User
          </Link>
          <Link to="/admin/add-blog" onClick={toggleMobileMenu}>
            Add Blogs
          </Link>

          {/* Profile Section (Only visible in mobile menu) */}
          <div className="flex flex-col items-center space-y-4 !mt-4 md:hidden">
            <img src={logo} alt="Profile" className="w-10 h-10 rounded-full" />
            <span className="text-lg font-semibold">Admin</span>
            <Link
              to="/profile"
              onClick={toggleMobileMenu}
              className="block !px-4 !py-2 hover:bg-gray-200 w-full text-center"
            >
              Profile
            </Link>
            <Link
              to="/logout"
              onClick={toggleMobileMenu}
              className="block !px-4 !py-2 hover:bg-gray-200 w-full text-center"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Section (Hidden in small screens) */}
      <div className="relative flex items-center space-x-2 dropdown hidden md:flex">
        <img
          src={logo}
          alt="Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />
        <div
          className="flex items-center space-x-1 cursor-pointer"
          onClick={toggleDropdown}
        >
          <span>Admin</span>
          {/* <FaCaretDown /> */}
          <p className="text-white">Close</p>
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute top-10 left-4 !mt-2 w-24 bg-white text-black rounded-lg shadow-lg z-10">
            <ul className="!py-2">
              <li>
                <Link
                  to="/profile"
                  onClick={toggleMobileMenu}
                  className="block !px-4 hover:bg-gray-200 !py-2 "
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  onClick={toggleMobileMenu}
                  className="block !px-4 hover:bg-gray-200 !py-2"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
