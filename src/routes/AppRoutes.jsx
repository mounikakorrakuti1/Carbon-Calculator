import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Calculator from "../pages/Calculator";
import Suggestions from "../pages/Suggestions";
import About from "../pages/About";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/Contact";
import Graphs from "../pages/Graphs";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/suggestions" element={<Suggestions />} />
      <Route path="/about" element={<About />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/graphs" element={<Graphs />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
