import { useNavigate } from "react-router-dom";
import { createContext, useState, useContext } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      const token = response.data.token;
      sessionStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      setUser(token);

      alert("You are logged in successfully!");

      // ⬇️ Make sure to only navigate once, after setting state
      if (decodedToken.role === "recruiter") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Failed", error);
      alert("Login failed. Please check your credentials.");
      throw error; // allow upper components to catch it
    }
  };

  const register = async ({
    firstName,
    lastName,
    email,
    accountType,
    password,
    password_confirmation,
  }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        firstName,
        lastName,
        email,
        accountType,
        password,
        password_confirmation,
      });

      alert(response.data.message);
      sessionStorage.setItem("token", JSON.stringify(response.data.token));
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
