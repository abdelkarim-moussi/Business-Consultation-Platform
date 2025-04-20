import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function DashboardCard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await axios.get(
          `http://127.0.0.1:8000/api/consultants/${user.id}/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Validate and transform the response data
        if (!response.data?.success || !response.data?.data) {
          throw new Error("Invalid data format received from server");
        }

        const transformedStats = {
          total_consultations: Number(response.data.data.total_consultations) || 0,
          completed_consultations: Number(response.data.data.completed_consultations) || 0,
          upcoming_consultations: Number(response.data.data.upcoming_consultations) || 0,
          average_rating: parseFloat(response.data.data.average_rating) || 0,
          article_stats: {
            total_articles: Number(response.data.data.article_stats?.total_articles) || 0,
          },
        };

        setStats(transformedStats);
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError(err.response?.data?.message || err.message || "Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  if (loading) return <div className="text-center py-8">Loading statistics...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!stats) return <div className="text-center py-8">No statistics available</div>;

  // Calculate derived values
  const revenue = stats.completed_consultations * 500;
  const revenueChange = 2.1;
  const consultationTime = { morning: 28, afternoon: 40, evening: 32 };

  // Sample data
  const latestBlogs = [
    { title: "The importance of business plan", date: "12/01/2025" },
    { title: "How to increase your revenues", date: "12/01/2025" },
  ];

  const latestCustomers = [
    { name: "Client 1", price: "DH 45.00" },
    { name: "Client 2", price: "DH 75.00" },
    { name: "Client 3", price: "DH 45.00" },
    { name: "Client 4", price: "DH 45.00" },
  ];

  // Card component for reusability
  const Card = ({ children, className = "", ...props }) => (
    <div
      className={`bg-white p-6 rounded-xl shadow-md ${className}`}
      style={{ borderTop: "4px solid #19485F" }}
      {...props}
    >
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-5">
      {/* Revenue Card */}
      <Card className="col-span-2">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-2xl font-bold text-primary">DH {revenue.toLocaleString()}</h2>
            <p className={`text-sm ${revenueChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {revenueChange >= 0 ? "↑" : "↓"} {Math.abs(revenueChange)}% vs last week
            </p>
            <p className="text-xs text-gray-400">Last 30 days</p>
          </div>
          <Button>View Report</Button>
        </div>
        <ChartPlaceholder>📊 Revenue Trend Chart</ChartPlaceholder>
      </Card>

      {/* Consultation Time Card */}
      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Consultation Time</p>
            <p className="text-xs text-gray-400">Time distribution</p>
          </div>
          <Button>View Report</Button>
        </div>
        <ChartPlaceholder>🥧 Time Distribution Chart</ChartPlaceholder>
        <div className="mt-4 text-sm space-y-1 text-primary">
          <p>🔵 Afternoon - {consultationTime.afternoon}%</p>
          <p>🟢 Evening - {consultationTime.evening}%</p>
          <p>🔴 Morning - {consultationTime.morning}%</p>
        </div>
      </Card>

      {/* Blogs & Customers */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <Card>
          <h3 className="font-semibold mb-2 text-primary">Latest Blogs</h3>
          <p className="text-sm text-gray-500 mb-2">
            You have {stats.article_stats.total_articles} published articles
          </p>
          <ul className="text-sm space-y-1 text-primary">
            {latestBlogs.map((blog, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{blog.title}</span>
                <span className="text-gray-400">{blog.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2 text-primary">Recent Clients</h3>
          <p className="text-sm text-gray-500 mb-2">
            {stats.total_consultations} total consultations
          </p>
          <ul className="text-sm space-y-2 text-primary">
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
        </Card>
      </div>

      {/* Consultations Card */}
      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Consultations</p>
            <h2 className="text-xl font-bold text-primary">{stats.total_consultations}</h2>
            <div className="space-y-1 text-primary">
              <p className="text-sm">
                <span className="font-medium">Completed:</span> {stats.completed_consultations}
              </p>
              <p className="text-sm">
                <span className="font-medium">Upcoming:</span> {stats.upcoming_consultations}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Avg rating: {stats.average_rating.toFixed(1) || "N/A"}/5
            </p>
          </div>
          <Button>View Report</Button>
        </div>
        <ChartPlaceholder>📈 Consultation Trend Chart</ChartPlaceholder>
      </Card>
    </div>
  );
}

// Reusable Button component
const Button = ({ children, ...props }) => (
  <button
    className="text-sm px-3 py-1 rounded-md transition"
    style={{
      backgroundColor: "#D9E0A4",
      color: "#19485F",
      border: "1px solid #19485F",
    }}
    {...props}
  >
    {children}
  </button>
);

// Reusable Chart Placeholder component
const ChartPlaceholder = ({ children }) => (
  <div
    className="h-32 rounded-lg flex items-center justify-center"
    style={{ backgroundColor: "#D9E0A450" }}
  >
    <span style={{ color: "#19485F" }}>{children}</span>
  </div>
);