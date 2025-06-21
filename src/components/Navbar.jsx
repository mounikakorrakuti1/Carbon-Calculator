import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-green-600 text-white px-4 py-3 shadow-md fixed top-0 w-full z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* ✅ Show title only if NOT on login page */}
        {location.pathname !== "/login" ? (
          <Link to="/" className="font-bold text-lg">
            Carbon Calculator
          </Link>
        ) : (
          <div></div>
        )}

        <div className="space-x-4 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/calculator">Calculator</Link>
          <Link to="/suggestions">Suggestions</Link>
          <Link to="/graphs">Graphs</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
