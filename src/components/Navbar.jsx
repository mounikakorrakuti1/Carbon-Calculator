import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white px-4 py-3 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="font-bold text-lg">
          Carbon Calculator
        </Link>
        <div className="space-x-4">
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
