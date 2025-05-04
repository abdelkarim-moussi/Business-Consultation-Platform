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
                <span className="font-bold text-indigo-500">{stats.total_consultations}</span>{" "}
                consultations
              </h2>
            </div>
          </div>

          <div className="rounded-lg flex items-center justify-center text-gray-400">
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

        <div className="col-span-3 grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <div className="border-b">
                <h3 className="text-gray-500 text-sm uppercase tracking-wider">
                  Total Blogs
                </h3>
                <p className="text-3xl font-bold text-indigo-600">
                  {stats.article_stats.total_articles}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                Latest Blogs
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Recent
                </span>
              </h3>

              <ul className="text-sm divide-y divide-gray-100">
                {stats.article_stats.latest_articles.map((article) => {
                  return (
                    <li
                      className="py-2 flex justify-between items-center"
                      key={article.id}
                    >
                      <Link
                        to={`../articles/${article.id}`}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        <span className="capitalize">
                          {truncateText(article.title, 20)}
                        </span>
                      </Link>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {format(Date(article.created_at), "dd MMMM, yyyy")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Customers Card */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center">
                Latest Customers
                <span className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
                  New
                </span>
              </h3>
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>

            {stats.latest_customers.length > 0 ? (
              <ul className="mt-4 text-sm divide-y divide-gray-100">
                {stats.latest_customers.map((customer, index) => (
                  <li
                    key={customer.id}
                    className="py-3 flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={customer.photo}
                          alt={customer.firstName + " " + customer.lastName}
                          className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                        />
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full"></span>
                      </div>
                      <span className="font-medium text-gray-700">
                        {customer.firstName + " " + customer.lastName}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">
                      {format(Date(customer.created_at), "dd MMM, yyyy")}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-8 py-6 flex flex-col items-center justify-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-300 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-center">You have no customers</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
