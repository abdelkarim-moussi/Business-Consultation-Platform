import axios from "axios";

export const fetchAuthUser = async () => {
  const token = sessionStorage.getItem("token");
  const response = await axios.get("http://127.0.0.1:8000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.user;
};
