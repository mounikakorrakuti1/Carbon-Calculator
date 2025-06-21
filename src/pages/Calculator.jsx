import React, { useState } from "react";
import ChartComponent from "../components/ChartComponent";
import { FiInfo, FiArrowRight, FiHome, FiTruck, FiCoffee, FiShoppingBag, FiWifi, FiZap } from "react-icons/fi";

const Calculator = () => {
  const [mode, setMode] = useState("overall");
  const [section, setSection] = useState("");
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const [inputs, setInputs] = useState({
    transportKm: "",
    flightHours: "",
    dietType: "Mixed",
    furnitureSpend: "",
    clothingSpend: "",
    subscriptions: "",
    electricity: "",
    gas: "",
    water: "",
  });

  // More accurate emission factors (kgCO2e per unit)
  const EMISSION_FACTORS = {
    transportKm: 0.21, // kg/km (average car)
    flightHours: 90,   // kg/hour (short-haul)
    diet: {
      Vegetarian: 800,    // kg/year
      Mixed: 1500,        // kg/year
      "Non-Vegetarian": 2500 // kg/year
    },
    furnitureSpend: 0.2,  // kg/₹100
    clothingSpend: 0.1,   // kg/₹100
    subscriptions: 10,    // kg/subscription/year
    electricity: 0.7,     // kg/kWh (India grid average)
    gas: 2.0,             // kg/liter (LPG)
    water: 0.001          // kg/liter (treatment and pumping)
  };

  const calculateCategoryEmissions = () => {
    return {
      Transportation:
        (inputs.transportKm * EMISSION_FACTORS.transportKm * 12 / 1000) + // Convert to tons/year
        (inputs.flightHours * EMISSION_FACTORS.flightHours * 12 / 1000),
      Food:
        EMISSION_FACTORS.diet[inputs.dietType] / 1000, // Convert to tons/year
      Goods:
        (inputs.furnitureSpend * EMISSION_FACTORS.furnitureSpend * 12 / 1000) +
        (inputs.clothingSpend * EMISSION_FACTORS.clothingSpend * 12 / 1000),
      Services: 
        (inputs.subscriptions * EMISSION_FACTORS.subscriptions / 1000),
      Home:
        (inputs.electricity * EMISSION_FACTORS.electricity * 12 / 1000) +
        (inputs.gas * EMISSION_FACTORS.gas * 12 / 1000) +
        (inputs.water * EMISSION_FACTORS.water * 365 / 1000),
    };
  };

  const handleOverallSubmit = (e) => {
    e.preventDefault();
    const emissions = calculateCategoryEmissions();
    const total = Object.values(emissions).reduce((a, b) => a + b, 0).toFixed(2);

    setChartData(
      Object.entries(emissions).map(([key, value]) => ({
        name: key,
        value: parseFloat(value.toFixed(2)),
        color: getCategoryColor(key)
      }))
    );

    setResult({
      total,
      comparison: getComparison(total),
      tips: getPersonalizedTips(emissions)
    });
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    const emissions = calculateCategoryEmissions();
    const value = emissions[section] || 0;

    setChartData([{ 
      name: section, 
      value: parseFloat(value.toFixed(2)),
      color: getCategoryColor(section)
    }]);
    setResult({
      total: value.toFixed(2),
      comparison: "",
      tips: getCategoryTips(section, value)
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Transportation: "#3b82f6", // blue
      Food: "#10b981",          // green
      Goods: "#f59e0b",         // yellow
      Services: "#8b5cf6",      // purple
      Home: "#ef4444"           // red
    };
    return colors[category] || "#6b7280";
  };

  const getComparison = (total) => {
    const avgIndian = 1.9; // tons/year
    const avgGlobal = 4.8; // tons/year
    const diffIndian = (total - avgIndian).toFixed(1);
    const diffGlobal = (total - avgGlobal).toFixed(1);

    if (total < avgIndian) {
      return `Your footprint is ${Math.abs(diffIndian)} tons lower than the average Indian!`;
    } else if (total < avgGlobal) {
      return `Your footprint is ${Math.abs(diffGlobal)} tons lower than global average but ${diffIndian} tons higher than Indian average.`;
    } else {
      return `Your footprint is ${diffGlobal} tons higher than global average.`;
    }
  };

  const getPersonalizedTips = (emissions) => {
    const maxCategory = Object.entries(emissions).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    return getCategoryTips(maxCategory, emissions[maxCategory]);
  };

  const getCategoryTips = (category, value) => {
    const tips = {
      Transportation: [
        "🚲 Try cycling or walking for short distances",
        "🚍 Use public transport at least 2 days/week",
        "✈️ Offset flight emissions when traveling"
      ],
      Food: [
        "🌱 Have at least 3 meat-free days per week",
        "🥗 Buy local and seasonal produce",
        "🗑️ Reduce food waste by planning meals"
      ],
      Goods: [
        "🛍️ Buy second-hand or sustainable clothing",
        "🪑 Choose durable furniture that lasts longer",
        "♻️ Recycle or donate items you no longer need"
      ],
      Services: [
        "💻 Cancel unused digital subscriptions",
        "☁️ Switch to cloud providers with green energy",
        "📱 Use devices for longer before upgrading"
      ],
      Home: [
        "💡 Switch to LED bulbs and energy-efficient appliances",
        "🌞 Use natural light during daytime",
        "🚿 Reduce shower time by 2 minutes"
      ]
    };
    return tips[category] || [
      "🌍 Small changes make a big difference when we all participate",
      "📱 Track your monthly footprint to see improvements",
      "🤝 Share your progress to inspire others"
    ];
  };

  const handleInputChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  const resetForm = () => {
    setInputs({
      transportKm: "",
      flightHours: "",
      dietType: "Mixed",
      furnitureSpend: "",
      clothingSpend: "",
      subscriptions: "",
      electricity: "",
      gas: "",
      water: "",
    });
    setResult(null);
    setChartData([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 p-4 md:p-8 text-gray-800">
  <div className="max-w-6xl mx-auto pt-16"> {/* Added pt-16 for padding-top */}
    {/* Header */}
    <header className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
        Carbon Footprint Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Measure your environmental impact and discover ways to reduce it
          </p>
        </header>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => {
              setMode("overall");
              resetForm();
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              mode === "overall"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <FiHome className="inline mr-2" />
            Overall Footprint
          </button>
          <button
            onClick={() => {
              setMode("section");
              resetForm();
            }}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              mode === "section"
                ? "bg-green-600 text-white shadow-md"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <FiInfo className="inline mr-2" />
            Category Analysis
          </button>
        </div>

        {/* Calculator Forms */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="md:col-span-5">
            {mode === "overall" ? (
              <form
                onSubmit={handleOverallSubmit}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiHome className="mr-2 text-green-600" />
                  Overall Footprint Calculator
                </h2>

                {/* Transport */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <FiTruck className="mr-2 text-blue-500" />
                    Transportation
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distance by car/bike (km/month)
                      </label>
                      <input
                        type="number"
                        value={inputs.transportKm}
                        onChange={(e) => handleInputChange("transportKm", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Flight hours (monthly)
                      </label>
                      <input
                        type="number"
                        value={inputs.flightHours}
                        onChange={(e) => handleInputChange("flightHours", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 2"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Food */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <FiCoffee className="mr-2 text-green-500" />
                    Food
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diet type
                    </label>
                    <select
                      value={inputs.dietType}
                      onChange={(e) => handleInputChange("dietType", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Mixed">Mixed (Vegetarian + Meat)</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </select>
                  </div>
                </div>

                {/* Goods */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <FiShoppingBag className="mr-2 text-yellow-500" />
                    Goods
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly spend on furniture (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.furnitureSpend}
                        onChange={(e) =>
                          handleInputChange("furnitureSpend", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 2000"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly spend on clothing (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.clothingSpend}
                        onChange={(e) =>
                          handleInputChange("clothingSpend", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 1500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <FiWifi className="mr-2 text-purple-500" />
                    Services
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No. of active subscriptions
                    </label>
                    <input
                      type="number"
                      value={inputs.subscriptions}
                      onChange={(e) => handleInputChange("subscriptions", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g. 5"
                      required
                    />
                  </div>
                </div>

                {/* Home */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3 flex items-center">
                    <FiZap className="mr-2 text-red-500" />
                    Home
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Electricity usage (kWh/month)
                      </label>
                      <input
                        type="number"
                        value={inputs.electricity}
                        onChange={(e) =>
                          handleInputChange("electricity", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 200"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cooking gas (litres/month)
                      </label>
                      <input
                        type="number"
                        value={inputs.gas}
                        onChange={(e) => handleInputChange("gas", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 10"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Water usage (litres/day)
                      </label>
                      <input
                        type="number"
                        value={inputs.water}
                        onChange={(e) => handleInputChange("water", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g. 100"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
                  >
                    Calculate Footprint
                  </button>
                </div>
              </form>
            ) : (
              <form
                onSubmit={handleSectionSubmit}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FiInfo className="mr-2 text-green-600" />
                  Category Analysis
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select a category to analyze:
                  </label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">-- Choose a Category --</option>
                    <option value="Transportation">🚗 Transportation</option>
                    <option value="Food">🍎 Food</option>
                    <option value="Goods">🛍️ Goods</option>
                    <option value="Services">📱 Services</option>
                    <option value="Home">🏠 Home</option>
                  </select>
                </div>

                {section === "Transportation" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Distance by car/bike (km/month)
                      </label>
                      <input
                        type="number"
                        value={inputs.transportKm}
                        onChange={(e) => handleInputChange("transportKm", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Flight hours (monthly)
                      </label>
                      <input
                        type="number"
                        value={inputs.flightHours}
                        onChange={(e) => handleInputChange("flightHours", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                )}

                {section === "Food" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diet type
                    </label>
                    <select
                      value={inputs.dietType}
                      onChange={(e) => handleInputChange("dietType", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Mixed">Mixed (Vegetarian + Meat)</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                    </select>
                  </div>
                )}

                {section === "Goods" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly spend on furniture (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.furnitureSpend}
                        onChange={(e) =>
                          handleInputChange("furnitureSpend", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly spend on clothing (₹)
                      </label>
                      <input
                        type="number"
                        value={inputs.clothingSpend}
                        onChange={(e) =>
                          handleInputChange("clothingSpend", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                )}

                {section === "Services" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No. of active subscriptions
                    </label>
                    <input
                      type="number"
                      value={inputs.subscriptions}
                      onChange={(e) =>
                        handleInputChange("subscriptions", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                )}

                {section === "Home" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Electricity usage (kWh/month)
                      </label>
                      <input
                        type="number"
                        value={inputs.electricity}
                        onChange={(e) =>
                          handleInputChange("electricity", e.target.value)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cooking gas (litres/month)
                      </label>
                      <input
                        type="number"
                        value={inputs.gas}
                        onChange={(e) => handleInputChange("gas", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Water usage (litres/day)
                      </label>
                      <input
                        type="number"
                        value={inputs.water}
                        onChange={(e) => handleInputChange("water", e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                )}

                {section && (
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Reset Form
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium shadow-md transition"
                    >
                      Analyze {section}
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Results Section */}
          <div className="md:col-span-7">
            {result && (
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-xl font-semibold mb-4">
                  Your Carbon Footprint Results
                </h2>

                {/* Summary Card */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="text-3xl font-bold text-green-700 mb-2">
                    {result.total} tons CO₂/year
                  </div>
                  <p className="text-gray-700">
                    {result.comparison}
                  </p>
                </div>

                {/* Chart */}
                <div className="mb-8">
                  <ChartComponent data={chartData} />
                </div>

                {/* Detailed Breakdown */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-3">Detailed Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 text-left">Category</th>
                          <th className="px-4 py-2 text-right">Emissions (tons/year)</th>
                          <th className="px-4 py-2 text-right">% of Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {chartData.map((item, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: item.color }}
                                ></div>
                                {item.name}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {item.value.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {((item.value / result.total) * 100).toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Personalized Tips */}
                <div>
                  <h3 className="text-lg font-medium mb-3">
                    Personalized Reduction Tips
                  </h3>
                  <div className="space-y-3">
                    {result.tips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                          <FiArrowRight className="text-green-600" />
                        </div>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <div className="text-gray-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    {mode === "overall" 
                      ? "Calculate Your Carbon Footprint" 
                      : "Select a Category to Analyze"}
                  </h3>
                  <p className="text-gray-500">
                    {mode === "overall"
                      ? "Fill out the form to see your estimated annual carbon emissions and personalized reduction tips."
                      : "Choose a specific category to analyze its contribution to your carbon footprint."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Modal */}
        {showInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <h3 className="text-xl font-semibold mb-4">About This Calculator</h3>
              <p className="text-gray-700 mb-4">
                This calculator estimates your carbon footprint based on scientifically validated emission factors. The results are approximations intended to help you understand your environmental impact.
              </p>
              <p className="text-gray-700 mb-4">
                Emission factors are sourced from IPCC, EPA, and India's Central Electricity Authority.
              </p>
              <button
                onClick={() => setShowInfo(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calculator;