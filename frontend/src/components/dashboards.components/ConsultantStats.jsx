import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { format } from "date-fns";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import AvailabilityPicker from "../DisponibilityPicker";
import { Link } from "react-router-dom";
import { LineChart } from "@mui/x-charts/LineChart";

export default function ConsultantStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;
  if (!stats)
    return <div className="text-center py-8">No statistics available</div>;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
        <AvailabilityPicker />

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
          </div>
          {/* <LineChart
            xAxis={[
              {
                data: [1, 2, 3, 4],
              },
            ]}
            series={[
              {
                data: [
                  stats.completed_consultations,
                  stats.accepted_consultations,
                  stats.refused_consultations,
                  stats.upcoming_consultations,
                ],
                area: true,
              },
            ]}
            height={300}
          /> */}

          <div className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            <PieChart
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: stats.completed_consultations,
                      label: "completed consultations",
                      color: "green",
                    },
                    {
                      id: 1,
                      value: stats.accepted_consultations,
                      label: "accepted consultations",
                      color: "blue",
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
                      color: "orange",
                    },
                  ],
                },
              ]}
              width={200}
              height={200}
            />
          </div>
        </div>

        <div className="col-span-3 grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-semibold">total blogs</h3>
            <p>{stats.article_stats.total_articles}</p>
            <h3 className="font-semibold mb-2">Latest Blogs</h3>

            <ul className="text-sm text-gray-700 space-y-1">
              {stats.article_stats.latest_articles.map((article) => {
                return (
                  <li className="flex justify-between gap-2" key={article.id}>
                    <Link to={`../articles/${article.id}`}>
                      <span>{truncateText(article.title, 20)}</span>
                    </Link>
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
                {stats.latest_customers.map((customer, index) => (
                  <li
                    key={customer.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={customer.photo}
                        alt={customer.firstName + " " + customer.lastName}
                        className="w-6 h-6 rounded-full"
                      />
                      <span>
                        {customer.firstName + " " + customer.lastName}
                      </span>
                    </div>
                    <p>
                      {format(Date(customer.created_at), "dd MMMM , yyyy H:mm")}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>you have no customers</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
