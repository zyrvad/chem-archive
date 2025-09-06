import React, { useState } from 'react';

export default function User() {
  const user = {
    username: "ChemistryGuru22",
    totalAnswered: 45,
    rank: "Amateur Chemist"
  };

  const stats = [
    { category: "Organic Chemistry", answered: 15 },
    { category: "Physical Chemistry", answered: 10 },
    { category: "General Chemistry", answered: 20 },
  ];

  const totalAnswered = stats.reduce((sum, s) => sum + s.answered, 0);

  // Mock data for the graph for different time scales.
  const dailyData = [
    { day: "Mon", solved: 3 },
    { day: "Tue", solved: 5 },
    { day: "Wed", solved: 4 },
    { day: "Thu", solved: 7 },
    { day: "Fri", solved: 6 },
    { day: "Sat", solved: 9 },
    { day: "Sun", solved: 8 },
  ];

  const weeklyData = [
    { week: "W1", solved: 22 },
    { week: "W2", solved: 35 },
    { week: "W3", solved: 28 },
    { week: "W4", solved: 41 },
  ];

  const monthlyData = [
    { month: "Jan", solved: 120 },
    { month: "Feb", solved: 150 },
    { month: "Mar", solved: 135 },
    { month: "Apr", solved: 170 },
    { month: "May", solved: 160 },
    { month: "Jun", solved: 190 },
  ];

  const [activeScale, setActiveScale] = useState('daily');
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const getActiveData = () => {
    switch (activeScale) {
      case 'daily':
        return dailyData;
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      default:
        return dailyData;
    }
  };

  const activeData = getActiveData();
  const maxSolved = Math.max(...activeData.map(d => d.solved));

  const SVG_WIDTH = 500;
  const SVG_HEIGHT = 200;
  const PADDING = 20;

  const points = activeData.map((d, i) => {
    const x = PADDING + (i / (activeData.length - 1)) * (SVG_WIDTH - 2 * PADDING);
    const y = SVG_HEIGHT - PADDING - (d.solved / maxSolved) * (SVG_HEIGHT - 2 * PADDING);
    return { x, y, value: d.solved, label: Object.values(d)[0] };
  });

  const linePath = points.map((p, i) =>
    `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`
  ).join(' ');

  const handleMouseMove = (e) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;

    let closestPoint = null;
    let minDistance = Infinity;

    points.forEach(point => {
      const distance = Math.abs(x - point.x);
      if (distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
      }
    });

    if (closestPoint && minDistance < 20) {
      setHoveredPoint(closestPoint);
    } else {
      setHoveredPoint(null);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={`pt-24 min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className={`${isDarkMode ? 'dark bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} rounded-xl shadow-xl p-8 max-w-4xl w-full mx-auto transition-colors duration-300`}>
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
            {user.username.slice(0, 2).toUpperCase()}
          </div>
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white': 'text-gray-800'}`}>{user.username}</h2>
          <p className={`text-lg font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.rank}</p>
        </div>

        {/* Overall Stats */}
        <div className={`rounded-lg p-6 shadow-sm flex flex-col items-center justify-center mb-10 ${isDarkMode ? 'dark bg-gray-700 text-white' : 'bg-gray-50 text-gray-800'}`}>
          <p className="text-4xl font-bold text-green-600">{totalAnswered}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Questions Answered</p>
        </div>

        {/* Questions Solved Graph */}
        <div className={`rounded-lg p-6 shadow-sm mb-10 ${isDarkMode ? 'dark bg-gray-700 text-white' : 'bg-gray-50 text-gray-800'}`}>
          <h3 className={`text-lg font-bold text-center mb-6 ${isDarkMode ? 'text-white': 'text-gray-800'}`}>
            Questions Solved Over Time
          </h3>
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setActiveScale('daily')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeScale === 'daily'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setActiveScale('weekly')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeScale === 'weekly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setActiveScale('monthly')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeScale === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
              }`}
            >
              All Time
            </button>
          </div>
          <div className="relative" onMouseMove={handleMouseMove} onMouseLeave={() => setHoveredPoint(null)}>
            <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
              <path d={linePath} fill="none" stroke="#2563EB" strokeWidth="2.5" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2563EB" />
              ))}
              {/* X-axis labels */}
              {points.map((p, i) => (
                <text
                  key={`label-${i}`}
                  x={p.x}
                  y={SVG_HEIGHT - PADDING / 2 + 5}
                  textAnchor="middle"
                  fontSize="12"
                  className="fill-gray-600 dark:fill-gray-400"
                >
                  {p.label}
                </text>
              ))}
              {hoveredPoint && (
                <>
                  <line
                    x1={hoveredPoint.x} y1={0}
                    x2={hoveredPoint.x} y2={SVG_HEIGHT}
                    stroke="#D1D5DB"
                    strokeDasharray="4"
                    strokeWidth="1"
                  />
                  <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="6" fill="#1D4ED8" stroke="white" strokeWidth="2" />
                  <g transform={`translate(${hoveredPoint.x + 10}, ${hoveredPoint.y})`}>
                    <rect
                      x="0" y="-20"
                      width="60"
                      height="30"
                      fill="rgba(255, 255, 255, 0.9)"
                      stroke="#2563EB"
                      rx="4"
                      ry="4"
                    />
                    <text x="30" y="-8" textAnchor="middle" fontSize="12" fill="#1F2937" fontWeight="bold">
                      {hoveredPoint.value}
                    </text>
                    <text x="30" y="4" textAnchor="middle" fontSize="10" fill="#6B7280">
                      {hoveredPoint.label}
                    </text>
                  </g>
                </>
              )}
            </svg>
          </div>
        </div>
        
        {/* Stats by Category with progress bars */}
        <div className={`rounded-lg p-6 shadow-sm mb-10 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className={`text-lg font-bold text-center mb-6 ${isDarkMode ? 'text-white': 'text-gray-800'}`}>
            Questions by Category
          </h3>
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`font-semibold text-sm ${isDarkMode ? 'text-gray-300': 'text-gray-700'}`}>{stat.category}</span>
                  <span className={`font-bold text-sm ${isDarkMode ? 'text-white': 'text-gray-900'}`}>{stat.answered} / {totalAnswered}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full shadow-inner" 
                    style={{ width: `${(stat.answered / totalAnswered) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div className={`rounded-lg p-6 shadow-sm ${isDarkMode ? 'bg-gray-700': 'bg-gray-50'}`}>
          <h3 className={`text-lg font-bold text-center mb-6 ${isDarkMode ? 'text-white': 'text-gray-800'}`}>
            Account Settings
          </h3>
          <ul className="space-y-4">
            <li className={`flex justify-between items-center py-2 px-4 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800': 'bg-gray-300'}` }>
              <span className="font-medium">Update Profile</span>
              <button className={`hover:text-blue-800 transition-colors duration-200 ${isDarkMode ? 'text-blue-400': 'text-blue-600'}`}>Edit</button>
            </li>
            <li className={`flex justify-between items-center py-2 px-4 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800': 'bg-gray-300'}` }>
              <span className="font-medium">Change Password</span>
              <button className={`hover:text-blue-800 transition-colors duration-200 ${isDarkMode ? 'text-blue-400': 'text-blue-600'}`}>Change</button>
            </li>
            <li className={`flex justify-between items-center py-2 px-4 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800': 'bg-gray-300'}` }>
              <span className="font-medium">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={() => setIsDarkMode(!isDarkMode)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
