import React, { useState } from "react";
import ChartComponent from "../components/ChartComponent";

const Calculator = () => {
  const [mode, setMode] = useState("overall");
  const [section, setSection] = useState("");
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState([]);

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

  // Calculation functions (dummy multipliers)
  const calculateCategoryEmissions = () => {
    return {
      Transportation:
        inputs.transportKm * 0.00021 + inputs.flightHours * 0.09,
      Food:
        inputs.dietType === "Vegetarian"
          ? 0.8
          : inputs.dietType === "Non-Vegetarian"
          ? 2.5
          : 1.5,
      Goods:
        inputs.furnitureSpend * 0.002 + inputs.clothingSpend * 0.001,
      Services: inputs.subscriptions * 0.01,
      Home:
        inputs.electricity * 0.0007 +
        inputs.gas * 0.002 +
        inputs.water * 0.0001,
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
      }))
    );

    setResult(`Total carbon footprint: ${total} tons/year 🌍`);
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    const emissions = calculateCategoryEmissions();
    const value = emissions[section] || 0;

    setChartData([{ name: section, value: parseFloat(value.toFixed(2)) }]);
    setResult(`${section} footprint: ${value.toFixed(2)} tons/year`);
  };

  const handleInputChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 text-gray-800">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">
        Carbon Footprint Calculator
      </h1>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => {
            setMode("overall");
            setResult(null);
            setChartData([]);
          }}
          className={`px-4 py-2 rounded ${
            mode === "overall" ? "bg-green-600 text-white" : "bg-white border"
          }`}
        >
          Overall Calculator
        </button>
        <button
          onClick={() => {
            setMode("section");
            setResult(null);
            setChartData([]);
          }}
          className={`px-4 py-2 rounded ${
            mode === "section" ? "bg-green-600 text-white" : "bg-white border"
          }`}
        >
          Section-wise Calculator
        </button>
      </div>

      {/* OVERALL FORM */}
      {mode === "overall" && (
        <form
          onSubmit={handleOverallSubmit}
          className="bg-white p-6 rounded shadow max-w-3xl mx-auto"
        >
          {/* Transport */}
          <h2 className="text-xl font-semibold mb-2">Transportation</h2>
          <label>
            Distance by car/bike (km/month):
            <input
              type="number"
              value={inputs.transportKm}
              onChange={(e) => handleInputChange("transportKm", e.target.value)}
              className="w-full border p-2 mb-3"
              required
            />
          </label>
          <label>
            Flight hours (monthly):
            <input
              type="number"
              value={inputs.flightHours}
              onChange={(e) => handleInputChange("flightHours", e.target.value)}
              className="w-full border p-2 mb-3"
              required
            />
          </label>

          {/* Food */}
          <h2 className="text-xl font-semibold mb-2 mt-4">Food</h2>
          <label>
            Diet type:
            <select
              value={inputs.dietType}
              onChange={(e) => handleInputChange("dietType", e.target.value)}
              className="w-full border p-2 mb-3"
            >
              <option>Vegetarian</option>
              <option>Mixed</option>
              <option>Non-Vegetarian</option>
            </select>
          </label>

          {/* Goods */}
          <h2 className="text-xl font-semibold mb-2 mt-4">Goods</h2>
          <label>
            Monthly spend on furniture (₹):
            <input
              type="number"
              value={inputs.furnitureSpend}
              onChange={(e) =>
                handleInputChange("furnitureSpend", e.target.value)
              }
              className="w-full border p-2 mb-3"
              required
            />
          </label>
          <label>
            Monthly spend on clothing (₹):
            <input
              type="number"
              value={inputs.clothingSpend}
              onChange={(e) =>
                handleInputChange("clothingSpend", e.target.value)
              }
              className="w-full border p-2 mb-3"
              required
            />
          </label>

          {/* Services */}
          <h2 className="text-xl font-semibold mb-2 mt-4">Services</h2>
          <label>
            No. of active subscriptions:
            <input
              type="number"
              value={inputs.subscriptions}
              onChange={(e) => handleInputChange("subscriptions", e.target.value)}
              className="w-full border p-2 mb-3"
              required
            />
          </label>

          {/* Home */}
          <h2 className="text-xl font-semibold mb-2 mt-4">Home</h2>
          <label>
            Electricity usage (kWh/month):
            <input
              type="number"
              value={inputs.electricity}
              onChange={(e) => handleInputChange("electricity", e.target.value)}
              className="w-full border p-2 mb-3"
              required
            />
          </label>
          <label>
            Cooking gas (litres/month):
            <input
              type="number"
              value={inputs.gas}
              onChange={(e) => handleInputChange("gas", e.target.value)}
              className="w-full border p-2 mb-3"
              required
            />
          </label>
          <label>
            Water usage (litres/day):
            <input
              type="number"
              value={inputs.water}
              onChange={(e) => handleInputChange("water", e.target.value)}
              className="w-full border p-2 mb-3"
              required
            />
          </label>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            Calculate Overall Footprint
          </button>
        </form>
      )}

      {/* SECTION FORM */}
      {mode === "section" && (
        <form
          onSubmit={handleSectionSubmit}
          className="bg-white p-6 rounded shadow max-w-xl mx-auto"
        >
          <label>
            Select a category to calculate:
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full border p-2 mb-4"
              required
            >
              <option value="">-- Choose a Category --</option>
              <option>Transportation</option>
              <option>Food</option>
              <option>Goods</option>
              <option>Services</option>
              <option>Home</option>
            </select>
          </label>

          {section === "Transportation" && (
            <>
              <label>
                Distance by car/bike (km/month):
                <input
                  type="number"
                  value={inputs.transportKm}
                  onChange={(e) => handleInputChange("transportKm", e.target.value)}
                  className="w-full border p-2 mb-3"
                  required
                />
              </label>
              <label>
                Flight hours (monthly):
                <input
                  type="number"
                  value={inputs.flightHours}
                  onChange={(e) => handleInputChange("flightHours", e.target.value)}
                  className="w-full border p-2 mb-3"
                  required
                />
              </label>
            </>
          )}

          {section === "Food" && (
            <label>
              Diet type:
              <select
                value={inputs.dietType}
                onChange={(e) => handleInputChange("dietType", e.target.value)}
                className="w-full border p-2 mb-3"
                required
              >
                <option>Vegetarian</option>
                <option>Mixed</option>
                <option>Non-Vegetarian</option>
              </select>
            </label>
          )}

          {section === "Goods" && (
            <>
              <label>
                Monthly spend on furniture (₹):
                <input
                  type="number"
                  value={inputs.furnitureSpend}
                  onChange={(e) =>
                    handleInputChange("furnitureSpend", e.target.value)
                  }
                  className="w-full border p-2 mb-3"
                  required
                />
              </label>
              <label>
                Monthly spend on clothing (₹):
                <input
                  type="number"
                  value={inputs.clothingSpend}
                  onChange={(e) =>
                    handleInputChange("clothingSpend", e.target.value)
                  }
                  className="w-full border p-2 mb-3"
                  required
                />
              </label>
            </>
          )}

          {section === "Services" && (
            <label>
              No. of active subscriptions:
              <input
                type="number"
                value={inputs.subscriptions}
                onChange={(e) =>
                  handleInputChange("subscriptions", e.target.value)
                }
                className="w-full border p-2 mb-3"
                required
              />
            </label>
          )}

          {section === "Home" && (
            <>
              <label>
                Electricity usage (kWh/month):
                <input
                  type="number"
                  value={inputs.electricity}
                  onChange={(e) =>
                    handleInputChange("electricity", e.target.value)
                  }
                  className="w-full border p-2 mb-3"
                  required
                />
              </label>
              <label>
                Cooking gas (litres/month):
                <input
                  type="number"
                  value={inputs.gas}
                  onChange={(e) => handleInputChange("gas", e.target.value)}
                  className="w-full border p-2 mb-3"
                  required
                />
              </label>
              <label>
                Water usage (litres/day):
                <input
                  type="number"
                  value={inputs.water}
                  onChange={(e) => handleInputChange("water", e.target.value)}
                  className="w-full border p-2 mb-3"
                  required
                />
              </label>
            </>
          )}

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
          >
            Calculate {section} Footprint
          </button>
        </form>
      )}

      {/* Output */}
      {result && (
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="bg-green-100 border border-green-300 rounded p-4 mb-4 text-center">
            <p className="text-lg font-semibold">{result}</p>
          </div>

          {/* Table */}
          <table className="table-auto w-full border text-center bg-white shadow mb-6">
            <thead>
              <tr className="bg-green-200">
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">Emissions (tons/year)</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((item, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pie Chart */}
          <ChartComponent data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Calculator;
