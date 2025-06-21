import React, { useState } from "react";

import TransportImg from "../assets/images/suggestions/Transport.jpg";
import FoodImg from "../assets/images/suggestions/Food.jpg";
import ClothesImg from "../assets/images/suggestions/clothes.jpg";
import LEDImg from "../assets/images/suggestions/LED.jpg";
import ServicesImg from "../assets/images/suggestions/Services.jpg";

const suggestionsData = [
  {
    id: 1,
    category: "Transportation",
    image: TransportImg,
    icon: "🚗",
    tips: [
      {
        title: "Use Public Transport",
        description: "Buses and trains significantly reduce per-person carbon emissions compared to private vehicles."
      },
      {
        title: "Carpooling",
        description: "Share rides with others to cut fuel consumption and traffic."
      },
      {
        title: "Biking & Walking",
        description: "Opt for short-distance walking or cycling to eliminate emissions altogether."
      },
      {
        title: "Avoid Air Travel",
        description: "Choose trains or buses for regional travel instead of high-emission flights."
      },
      {
        title: "Maintain Your Vehicle",
        description: "Regular service improves fuel efficiency and reduces pollution."
      },
    ]
  },
  {
    id: 2,
    category: "Food",
    image: FoodImg,
    icon: "🥗",
    tips: [
      {
        title: "Eat Local & Seasonal",
        description: "Reduce transportation emissions by buying food grown nearby and in season."
      },
      {
        title: "Reduce Meat Intake",
        description: "Livestock production has a high carbon footprint — reducing meat helps."
      },
      {
        title: "Avoid Food Waste",
        description: "Plan meals and store food properly to avoid throwing food away."
      },
      {
        title: "Compost Food Scraps",
        description: "Instead of sending organic waste to landfills, compost it to reuse nutrients."
      },
      {
        title: "Grow Your Own",
        description: "Start a home garden to reduce packaging and transport emissions."
      },
    ]
  },
  {
    id: 3,
    category: "Clothing",
    image: ClothesImg,
    icon: "👕",
    tips: [
      {
        title: "Buy Less, Choose Well",
        description: "Avoid fast fashion and invest in long-lasting clothing."
      },
      {
        title: "Second-Hand Shopping",
        description: "Buying pre-loved clothes reduces the carbon cost of new production."
      },
      {
        title: "Donate or Upcycle",
        description: "Give old clothes a second life through donation or DIY projects."
      },
      {
        title: "Wash Responsibly",
        description: "Use cold water and full loads to reduce electricity usage."
      },
      {
        title: "Avoid Synthetics",
        description: "Choose organic cotton or wool — synthetics shed microplastics."
      },
    ]
  },
  {
    id: 4,
    category: "Home",
    image: LEDImg,
    icon: "🏠",
    tips: [
      {
        title: "Switch to LED Lighting",
        description: "LEDs use less energy and last longer than traditional bulbs."
      },
      {
        title: "Insulate Your Home",
        description: "Proper insulation reduces heating and cooling needs."
      },
      {
        title: "Use Smart Thermostats",
        description: "They optimize energy use and cut electricity bills."
      },
      {
        title: "Solar Panels",
        description: "Generate clean electricity and reduce dependence on the grid."
      },
      {
        title: "Fix Leaks",
        description: "Fix dripping taps and leaks to save water and energy."
      },
    ]
  },
  {
    id: 5,
    category: "Services",
    image: ServicesImg,
    icon: "📱",
    tips: [
      {
        title: "Cancel Unused Subscriptions",
        description: "Fewer active apps or services means less cloud data and server use."
      },
      {
        title: "Switch to Green Providers",
        description: "Choose ISPs or cloud services that run on renewable energy."
      },
      {
        title: "Digital Cleanups",
        description: "Delete old emails, photos, and files to reduce storage energy."
      },
      {
        title: "Remote Working",
        description: "Less commuting means lower transportation-related emissions."
      },
      {
        title: "Stream Responsibly",
        description: "Streaming on smaller screens or lower quality reduces data center load."
      },
    ]
  },
];

const Suggestions = () => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleCard = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 pt-28">
      <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">
        Environmental Suggestions
      </h1>

      <div className="flex flex-col gap-6">
        {suggestionsData.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600 transition-all"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleCard(category.id)}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-xl font-semibold text-green-800">
                  {category.category} Suggestions
                </h2>
              </div>
              <span className="text-xl text-green-700">
                {expandedId === category.id ? "−" : "+"}
              </span>
            </div>

            {expandedId === category.id && (
              <div className="mt-4">
                <img
                  src={category.image}
                  alt={category.category}
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <ul className="list-disc ml-5 space-y-4">
                  {category.tips.map((tip, index) => (
                    <li key={index}>
                      <strong className="text-green-700">{tip.title}:</strong> {tip.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
