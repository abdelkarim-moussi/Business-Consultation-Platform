import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
export default function DashboardHeader({ page }) {
  const { logout } = useAuth();
  const [fetchedUser, setFetchedUser] = useState({});
  const navigate = useNavigate();

  const [mode, setMode] = useState("hidden");

  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");

    const response = await axios.get("http://127.0.0.1:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setFetchedUser(response.data.user);
  };

  const handlelogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.log("logout failed", error);
    }
  };

  const expandOptions = () => {
    if (mode === "hidden") {
      return setMode("flex");
    }
    setMode("hidden");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="p-2 sticky top-0 z-20">
      <div className="flex items-center justify-between gap-10 mb-8 bg-[#4F46E5] text-white p-4 w-full z-20 rounded-lg shadow-md">
        <h1 className="text-xl font-semibold">{page}</h1>

        <div className="flex items-center space-x-4 gap-5">
          <div className="flex items-center space-x-2">
            <div className="border-2 rounded-full border-white uppercase h-10 w-10 text-center flex items-center justify-center">
              {/* {fetchedUser.firstName.slice(0, 1) +
                "" +
                fetchedUser.lastName.slice(0, 1)} */}
            </div>

            <span className="text-gray-100 text-sm capitalize">
              {fetchedUser.firstName + " " + fetchedUser.lastName}
            </span>

            <div className="relative flex flex-col items-end">
              <button
                onClick={expandOptions}
                aria-expanded={mode === "flex"}
                aria-label="Toggle user options"
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-100 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                  />
                </svg>
              </button>

              {mode === "flex" && (
                <div className="absolute mt-10 w-40 right-0 flex flex-col bg-white border border-gray-200 text-black py-3 px-4 rounded-lg shadow-lg text-sm gap-3 z-50 transition-all duration-200">
                  <Link
                    to="/profile"
                    className="hover:text-[#4F46E5] transition-colors duration-150 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    Profile
                  </Link>
                  <button
                    onClick={handlelogout}
                    className="flex items-center gap-2 text-left hover:text-red-600 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
