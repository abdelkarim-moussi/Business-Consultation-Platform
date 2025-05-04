import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";

const EntrepreneurConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString, format) => {
    const date = new Date(dateString);

    if (format === "d-m-y H:mm") {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    if (format === "MMM d, yyyy") {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      return `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
    }

    if (format === "h:mm a") {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      return `${hours}:${minutes} ${ampm}`;
    }

    return date.toISOString();
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(token);

      const response = await axios.get(
        `http://127.0.0.1:8000/api/consultations/entrepreneur/${decoded.sub}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConsultations(response.data.consultations);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await axios.post(
        `http://127.0.0.1:8000/api/consultations/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);
      fetchConsultations();
    } catch (error) {
      toast.error("there is an error");
      console.log(error);
    }
  };

  const StatusBadge = ({ status }) => {
    let colors = "bg-gray-100 text-gray-800";

    if (status === "pending") {
      colors = "bg-amber-100 text-amber-800";
    } else if (status === "in progress") {
      colors = "bg-green-100 text-yellow-800";
    } else if (status === "refused") {
      colors = "bg-red-100 text-red-800";
    }
    else if(status === "accepted") {
      colors = "bg-green-100 text-green-800";
    }
    else if(status === "done") {
      colors = "bg-blue-100 text-blue-800";
    }

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <>
      <div className="p-5">
        <div className="bg-white p-5 w-full overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">My Consultations</h2>
          </div>

          {loading ? (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              </div>
            </div>
          ) : consultations.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You don't have any consultations yet.
            </p>
          ) : (
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-500 uppercase border-b">
                <tr>
                  <th className="px-4 py-3">Consultant photo</th>
                  <th className="px-4 py-3">Consultant</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Delay</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {consultations.map((consultation) => (
                  <tr
                    key={consultation.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={consultation.consultant.photo}
                        alt="photo"
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      {consultation.consultant.firstName +
                        " " +
                        consultation.consultant.lastName}
                    </td>
                    <td className="px-4 py-3 truncate max-w-xs">
                      {consultation.consultation_reason}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={consultation.status} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(consultation.date, "MMM d, yyyy")} <br />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {consultation.delay} "Minutes"
                      <br />
                    </td>

                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      {consultation.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(consultation.id, "cancel")
                            }
                            className="bg-green-50 px-2 rounded-xl text-green-600 hover:bg-green-100"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default EntrepreneurConsultations;
