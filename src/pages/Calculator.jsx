// src/pages/Calculator.jsx
import React from "react";
import Navbar from "../components/Navbar";

const Calculator = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
          Carbon Footprint Calculator
        </h1>

        {/* Overall Calculator Section */}
        <section id="overall" className="mb-12 p-6 bg-green-50 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🌍 Overall Carbon Footprint</h2>
          <p className="text-sm text-gray-600 mb-4">Combined calculation across electricity, transportation, and diet.</p>
          {/* Placeholder for form & result */}
          <div className="border-2 border-dashed border-green-300 p-4 rounded-lg text-center text-gray-500">
            Overall Calculator UI will be here.
          </div>
        </section>

        {/* Electricity Section */}
        <section id="electricity" className="mb-12 p-6 bg-green-50 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">💡 Electricity</h2>
          <div className="border-2 border-dashed border-green-300 p-4 rounded-lg text-center text-gray-500">
            Electricity Calculator UI will be here.
          </div>
        </section>

        {/* Transportation Section */}
        <section id="transportation" className="mb-12 p-6 bg-green-50 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🚗 Transportation</h2>
          <div className="border-2 border-dashed border-green-300 p-4 rounded-lg text-center text-gray-500">
            Transportation Calculator UI will be here.
          </div>
        </section>

        {/* Diet Section */}
        <section id="diet" className="mb-12 p-6 bg-green-50 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">🥗 Diet</h2>
          <div className="border-2 border-dashed border-green-300 p-4 rounded-lg text-center text-gray-500">
            Diet Calculator UI will be here.
          </div>
        </section>
      </div>
    </div>
  );
};

export default Calculator;
