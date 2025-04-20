import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const ConsultantStats = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`/api/consultants/${user.id}/stats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
        });
        setStats(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  if (loading) return <div className="text-center py-8">Loading statistics...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!stats) return <div className="text-center py-8">No statistics available</div>;

  // Calculate revenue (example: 500 DH per completed consultation)
  const revenue = stats.completed_consultations * 500;
  const revenueChange = 2.1; // This would ideally come from API

  // Mock consultation time distribution (would come from API in real implementation)
  const consultationTime = { morning: 28, afternoon: 40, evening: 32 };

  // Mock latest blogs (would come from API)
  const latestBlogs = [
    { title: "The importance of business plan", date: "12/01/2025" },
    { title: "How to increase your revenues", date: "12/01/2025" }
  ];

  // Mock latest customers (would come from API)
  const latestCustomers = [
    { name: "Client 1", price: "DH 45.00" },
    { name: "Client 2", price: "DH 75.00" },
    { name: "Client 3", price: "DH 45.00" },
    { name: "Client 4", price: "DH 45.00" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5">
      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-xl shadow-md col-span-2" style={{ borderTop: `4px solid #19485F` }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold" style={{ color: '#19485F' }}>DH {revenue.toLocaleString()}</h2>
            <p className={`${revenueChange >= 0 ? 'text-green-500' : 'text-red-500'} text-sm`}>
              {revenueChange >= 0 ? '↑' : '↓'} {Math.abs(revenueChange)}% vs last week
            </p>
            <p className="text-xs text-gray-400">Last 30 days</p>
          </div>
          <button 
            className="text-sm px-3 py-1 rounded-md transition"
            style={{ 
              backgroundColor: '#D9E0A4', 
              color: '#19485F',
              border: '1px solid #19485F'
            }}
          >
            View Report
          </button>
        </div>
        <div className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D9E0A450' }}>
          <span style={{ color: '#19485F' }}>📊 Revenue Trend Chart</span>
        </div>
      </div>

      {/* Consultation Time Card */}
      <div className="bg-white p-6 rounded-xl shadow-md" style={{ borderTop: `4px solid #19485F` }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Consultation Time</p>
            <p className="text-xs text-gray-400">Time distribution</p>
          </div>
          <button 
            className="text-sm px-3 py-1 rounded-md transition"
            style={{ 
              backgroundColor: '#D9E0A4', 
              color: '#19485F',
              border: '1px solid #19485F'
            }}
          >
            View Report
          </button>
        </div>
        <div className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D9E0A450' }}>
          <span style={{ color: '#19485F' }}>🥧 Time Distribution Chart</span>
        </div>
        <div className="mt-4 text-sm space-y-1" style={{ color: '#19485F' }}>
          <p>🔵 Afternoon - {consultationTime.afternoon}%</p>
          <p>🟢 Evening - {consultationTime.evening}%</p>
          <p>🔴 Morning - {consultationTime.morning}%</p>
        </div>
      </div>

      {/* Blogs & Customers */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        {/* Latest Blogs */}
        <div className="bg-white p-6 rounded-xl shadow-md" style={{ borderTop: `4px solid #19485F` }}>
          <h3 className="font-semibold mb-2" style={{ color: '#19485F' }}>Latest Blogs</h3>
          <p className="text-sm text-gray-500 mb-2">
            You have {stats.article_stats.total_articles} published articles
          </p>
          <ul className="text-sm space-y-1" style={{ color: '#19485F' }}>
            {latestBlogs.map((blog, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{blog.title}</span>
                <span className="text-gray-400">{blog.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest Customers */}
        <div className="bg-white p-6 rounded-xl shadow-md" style={{ borderTop: `4px solid #19485F` }}>
          <h3 className="font-semibold mb-2" style={{ color: '#19485F' }}>Recent Clients</h3>
          <p className="text-sm text-gray-500 mb-2">
            {stats.total_consultations} total consultations
          </p>
          <ul className="text-sm space-y-2" style={{ color: '#19485F' }}>
            {latestCustomers.map((cust, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://i.pravatar.cc/30?img=${idx + 10}`}
                    alt={cust.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{cust.name}</span>
                </div>
                <span className="text-gray-500">{cust.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Consultations Card */}
      <div className="bg-white p-6 rounded-xl shadow-md" style={{ borderTop: `4px solid #19485F` }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Consultations</p>
            <h2 className="text-xl font-bold" style={{ color: '#19485F' }}>{stats.total_consultations}</h2>
            <div className="space-y-1">
              <p className="text-sm" style={{ color: '#19485F' }}>
                <span className="font-medium">Completed:</span> {stats.completed_consultations}
              </p>
              <p className="text-sm" style={{ color: '#19485F' }}>
                <span className="font-medium">Upcoming:</span> {stats.upcoming_consultations}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">Avg rating: {stats.average_rating || 'N/A'}/5</p>
          </div>
          <button 
            className="text-sm px-3 py-1 rounded-md transition"
            style={{ 
              backgroundColor: '#D9E0A4', 
              color: '#19485F',
              border: '1px solid #19485F'
            }}
          >
            View Report
          </button>
        </div>
        <div className="h-32 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#D9E0A450' }}>
          <span style={{ color: '#19485F' }}>📈 Consultation Trend Chart</span>
        </div>
      </div>
    </div>
  );
};

export default ConsultantStats;