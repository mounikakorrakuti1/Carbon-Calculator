import React, { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import html2canvas from 'html2canvas';

const categories = [
  { key: 'transport', name: 'Transportation', subs: ['Car', 'Bike', 'Air'] },
  { key: 'food', name: 'Food', subs: ['Meat', 'Plant', 'Dairy'] },
  { key: 'home', name: 'Home', subs: ['Electricity', 'Gas', 'Water'] },
  { key: 'goods', name: 'Goods', subs: ['Clothing', 'Furniture'] },
  { key: 'services', name: 'Services', subs: ['Streaming', 'Internet'] }
];
const timeOptions = ['week', 'month', 'year'];

function generateData(subs, period) {
  const count = period === 'week' ? 7 : period === 'month' ? 30 : 12;
  return Array.from({ length: count }, (_, i) => {
    const label = period === 'year'
      ? `M${i+1}` : `D${i+1}`;
    const obj = { name: label };
    subs.forEach(sub => obj[sub] = Math.floor(Math.random()*50)+20);
    return obj;
  });
}

export default function Graphs() {
  const [period, setPeriod] = useState('week');
  const [data, setData] = useState({});
  const chartRefs = useRef({});

  useEffect(() => {
    const newData = {};
    categories.forEach(cat =>
      newData[cat.key] = generateData(cat.subs, period)
    );
    setData(newData);
  }, [period]);

  const handleDownload = key => {
    const node = chartRefs.current[key];
    if (!node) return;
    html2canvas(node).then(canvas => {
      const link = document.createElement('a');
      link.download = `${key}_${period}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 pt-28">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        Your Carbon Footprint Trends
      </h1>

      <div className="flex justify-center mb-6 space-x-4">
        {timeOptions.map(opt => (
          <button
            key={opt}
            className={`px-4 py-2 rounded ${
              period === opt ? 'bg-green-600 text-white' : 'bg-white text-green-600 border'
            }`}
            onClick={() => setPeriod(opt)}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {categories.map(cat => (
          <div key={cat.key} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              {cat.name}
            </h2>

            {/* Goal & Progress */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 mb-1">Goal: Reduce by 10%</p>
              <div className="w-full bg-gray-200 h-3 rounded">
                <div className="bg-green-600 h-3 rounded" style={{ width: '65%' }}></div>
              </div>
            </div>

            {/* Charts */}
            <div ref={el => chartRefs.current[cat.key] = el}>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data[cat.key]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {cat.subs.map(sub => (
                    <Bar key={sub} dataKey={sub} fill="#4CAF50" />
                  ))}
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={200} className="mt-4">
                <LineChart data={data[cat.key]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {cat.subs.map(sub => (
                    <Line key={sub} dataKey={sub} stroke="#2E7D32" />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-right mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => handleDownload(cat.key)}
              >
                Download Chart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
