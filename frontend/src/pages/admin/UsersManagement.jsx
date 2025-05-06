import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
import { toast } from "react-toastify";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [accountFilter, setAccountFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [newStatus, setNewStatus] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/users/admin",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyUser = async (id) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${id}/verify`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      toast.success(response.data.message);
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("there was an error");
    }
  };

  const manageUserStatus = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${id}/status`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message);
      toast.success(response.data.message);
      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAccount =
      accountFilter === "All" || user.accountType === accountFilter;
    const matchesStatus =
      statusFilter === "All" || user.status === statusFilter;

    return matchesSearch && matchesAccount && matchesStatus;
  });

  const accountTypes = [
    "All",
    ...new Set(users.map((user) => user.accountType)),
  ];
  const statuses = ["All", ...new Set(users.map((user) => user.status))];

  return (
    <div className="flex">
      <Sidebar active="users/management" />
      <div className="w-full grid grid-cols-1">
        <DashboardHeader page="Available Users" />
        <div className=" rounded-lg shadow p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold text-gray-500">Available Users</h1>

            <div className="flex gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-5 py-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                className="px-3 py-1 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={accountFilter}
                onChange={(e) => setAccountFilter(e.target.value)}
              >
                {accountTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                className="px-3 py-1 border text-xs border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-auto w-full">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Photo
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        User Name
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Account Type
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Verified
                      </th>
                      <th className="px-5 py-2 text-left text-xs font-normal text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }
                        >
                          <td className="px-5 py-1 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                src={user.photo}
                                alt="Profile"
                                className="h-10 w-10 rounded-full object-cover border border-gray-200"
                              />
                            </div>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap">
                            <div className="text-sm font-normal text-gray-600">
                              {user.firstName} {user.lastName}
                            </div>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.accountType === "consultant"
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {user.accountType}
                            </span>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : user.status === "notActive"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.is_verified == 1
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {user.is_verified == 1
                                ? "Verified"
                                : "Not Verified"}
                            </span>
                          </td>
                          <td className="px-5 py-1 whitespace-nowrap text-xs space-x-2">
                            {user.is_verified == 0 && (
                              <button
                                className="text-indigo-600 hover:text-indigo-900 border-r pr-2"
                                onClick={() => verifyUser(user.id)}
                              >
                                Verify
                              </button>
                            )}
                            {user.status != "suspended" && (
                              <button
                                className="text-red-600 hover:text-red-900 border-r pr-2"
                                onClick={() =>
                                  manageUserStatus(user.id, "suspended")
                                }
                              >
                                Suspend
                              </button>
                            )}
                            {user.status != "active" && (
                              <button
                                className="text-green-600 hover:grenn-red-900"
                                onClick={() =>
                                  manageUserStatus(user.id, "active")
                                }
                              >
                                Activate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="px-5 py-1 text-center text-sm text-gray-500"
                        >
                          No users found matching your search criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
