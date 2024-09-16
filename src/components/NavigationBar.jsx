import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(Boolean(user));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-yellow-500 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            Rentify
          </Link>
        </div>

        <button
          className="text-white lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <div
          className={`ml-auto flex items-center space-x-4 lg:flex lg:items-center ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {isLoggedIn ? (
            <>
              <Link to="/" className="hover:underline text-xl">
                Home
              </Link>
              <Link to="/profile" className="hover:underline text-xl">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 w-full lg:w-auto mt-2 lg:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="hover:underline text-xl">
                Login
              </Link>
              <Link to="/signup" className="hover:underline text-xl">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
