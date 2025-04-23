import { useAuth } from "../context/AuthContext";
import Logout from "../assets/images/logout-white.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DashboardHeader() {
  const { logout } = useAuth();
  const [fetchedUser, setFetchedUser] = useState({});
  const navigate = useNavigate();

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
      navigate('/login')
    } catch (error) {
      console.log("logout failed", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-between gap-10 mb-8 bg-[#19485F] text-white p-5 w-full sticky top-0 z-20">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4 gap-5">
        <div className="w-[350px] h-[40px] bg-white rounded-lg">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-1 text-sm w-full h-full bg-transparent outline-none text-gray-600 rounded-lg"
          />
        </div>
        <button onClick={handlelogout} className="hover::co">
          <img src={Logout} className="w-5" />
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/30"
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-100 text-sm">
            {fetchedUser.firstName + " " + fetchedUser.lastName}
          </span>
        </div>
      </div>
    </div>
  );
}
