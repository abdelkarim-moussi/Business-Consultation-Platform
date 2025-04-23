import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { format } from "date-fns";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function ConsultantStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/consultants/${user.id}/stats`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        setStats(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  if (loading)
    return <div className="text-center py-8">Loading statistics...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!stats)
    return <div className="text-center py-8">No statistics available</div>;

  // const revenue = stats.completed_consultations * 500;
  // const revenueChange = 2.1;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Revenue Card */}
      <div className="bg-white p-6 rounded-xl shadow-md col-span-2">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Consultations</p>
            <h2 className="text-2xl">
              you have :{" "}
              <span className="font-bold">{stats.total_consultations}</span>{" "}
              consultations
            </h2>
            <p className="text-green-500 text-sm">↑ 2.1% vs last week</p>
            <p className="text-xs text-gray-400">from 1–12 Dec, 2020</p>
          </div>
          <button className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50">
            View Report
          </button>
        </div>
        <div className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          {/* <BarChart className=""
            series={[
              { data: [stats.completed_consultations, stats.accepted_consultations, stats.refused_consultations, stats.upcoming_consultations] },
              { data: [stats.completed_consultations, stats.accepted_consultations, stats.refused_consultations, stats.upcoming_consultations] },
              { data: [stats.completed_consultations, stats.accepted_consultations, stats.refused_consultations, stats.upcoming_consultations] },
              { data: [stats.completed_consultations, stats.accepted_consultations, stats.refused_consultations, stats.upcoming_consultations] },
            ]}
            height={290}
            xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
          /> */}

          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: stats.completed_consultations,
                    label: "completed consultations",
                    color:'green'
                  },
                  {
                    id: 1,
                    value: stats.accepted_consultations,
                    label: "accepted consultations",
                    color:'blue'
                  },
                  {
                    id: 2,
                    value: stats.refused_consultations,
                    label: "refused consultations",
                  },
                  {
                    id: 3,
                    value: stats.upcoming_consultations,
                    label: "pending consultations",
                    color:'orange'
                  },
                ],
              },
            ]}
            width={200}
            height={200}
          />
        </div>
      </div>

      {/* Consultation Time Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Consultation Time</p>
            <p className="text-xs text-gray-400">From 1–6 Dec, 2020</p>
          </div>
          <button className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50">
            View Report
          </button>
        </div>
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          🥧 Pie Chart Placeholder
        </div>
        <div className="mt-4 text-sm text-gray-600 space-y-1">
          <p>🔵 Afternoon - 40%</p>
          <p>🟢 Evening - 32%</p>
          <p>🔴 Morning - 28%</p>
        </div>
      </div>

      {/* Blogs & Customers */}
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold">total blogs</h3>
          <p>{stats.article_stats.total_articles}</p>
          <h3 className="font-semibold mb-2">Latest Blogs</h3>

          <ul className="text-sm text-gray-700 space-y-1">
            {stats.article_stats.latest_articles.map((article) => {
              return (
                <li
                  className="flex justify-between gap-2"
                  key={article.id}
                >
                  <span>{article.title}</span>
                  <span className="text-gray-400">
                    {format(Date(article.created_at), "dd MMMM , yyyy H:mm")}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold mb-2">Latest Customers</h3>
          {stats.latest_customers.length > 0 ? (
            <ul className="text-sm text-gray-700 space-y-2">
              {stats.latest_customers.map((customer) => (
                <li
                  key={customer.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src={`https://i.pravatar.cc/30?img=${customer.id + 1}`}
                      alt={customer.firstName + " " + customer.lastName}
                      className="w-6 h-6 rounded-full"
                    />
                    <span>{customer.firstName + " " + customer.lastName}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>you have no customers</p>
          )}
        </div>
      </div>

      {/* Consultations Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-gray-500">Consultations</p>
            <h2 className="text-xl font-bold">{stats.total_consultations}</h2>
            <p className="text-green-500 text-sm">completed Consultations</p>
            <h2 className="text-xl font-bold">
              {stats.completed_consultations}
            </h2>
            <p className="text-xs text-gray-400">1–6 Dec, 2020</p>
          </div>
          <button className="text-sm px-3 py-1 border rounded-md hover:bg-gray-50">
            View Report
          </button>
        </div>
        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          📈 Line Chart Placeholder
        </div>
      </div>
    </div>
  );
}
