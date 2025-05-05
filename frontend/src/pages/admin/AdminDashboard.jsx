import React, { useState, useEffect } from "react";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
import axios from "axios";
import StatCard from "../../components/StatCard";
import { AuthProvider } from "../../context/AuthContext";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/stats/admin",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setStats(response.data.stats);
      setCategories(response.data.stats.popular_categories);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const userDistributionData = [
    { id: 0, value: stats.total_entrepreneurs, label: "Entrepreneurs" },
    { id: 1, value: stats.total_consultants, label: "Consultants" },
    {
      id: 2,
      value: stats.total_users,
      label: "All Users",
    },
  ];

  const consultationsData = [
    { id: 0, value: stats.completed_consultations, label: "Completed" },
    { id: 1, value: stats.upcoming_consultations, label: "pending" },
    { id: 2, value: stats.refused_consultations, label: "refused" },
    { id: 3, value: stats.accepted_consultations, label: "accepted" },
    { id: 4, value: stats.canceled_consultations, label: "canceled" },
  ];

  const chartColors = ["#2196f3", "#ff9800", "#4caf50"];

  return (
    <div className="flex h-screen">
      <AuthProvider>
        <Sidebar active="adminDash" />
      </AuthProvider>
      <div className="flex flex-col w-full overflow-auto">
        <DashboardHeader page="Dashboard" />

        {loading ? (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-5">
                <StatCard
                  title="Total Users"
                  value={stats.total_users}
                  icon="👥"
                />
                <StatCard
                  title="Total Consultants"
                  value={stats.total_consultants}
                  icon="👨‍💼"
                />
                <StatCard
                  title="Total Entrepreneurs"
                  value={stats.total_entrepreneurs}
                  icon="🚀"
                />
                <StatCard
                  title="Total Consultations"
                  value={stats.total_consultations}
                  icon="🤝"
                />
                <StatCard
                  title="Completed Consultations"
                  value={stats.completed_consultations}
                  icon="✅"
                />
                <StatCard
                  title="Total Articles"
                  value={stats.total_articles}
                  icon="📝"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 p-3 gap-3">
              <div className="h-64">
                <h3 className="text-lg font-semibold mb-2">Users Stats</h3>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: userDistributionData.map((item) => item.label),
                    },
                  ]}
                  series={[
                    {
                      data: userDistributionData.map((item) => item.value),
                      colors: chartColors,
                    },
                  ]}
                  height={250}
                />
              </div>

              <div className="mb-2">
                <div className="h-64">
                  <h3 className="text-lg font-semibold mb-2">
                    Consultations Stats
                  </h3>
                  <PieChart
                    series={[
                      {
                        data: consultationsData,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 4,
                        startAngle: -90,
                        endAngle: 270,
                        colors: chartColors,
                      },
                    ]}
                    height={250}
                    legend={{
                      position: "bottom",
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
