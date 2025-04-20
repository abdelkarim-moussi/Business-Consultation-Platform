import { useNavigate } from "react-router-dom";
import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser(decoded);
          setToken(token);
        } catch (err) {
          console.error("Invalid token:", err);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      const authToken = response.data.token;
      setToken(authToken);
      sessionStorage.setItem("token", authToken);
      const decodedToken = jwtDecode(authToken);

      setUser({ 
        email: email, 
        accountType: decodedToken["accountType"] 
      });

      alert("You are logged in successfully!");

      if (decodedToken.accountType === "consultant") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login Failed", error);
      alert("Login failed. Please check your credentials.");
      throw error;
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

      const authToken = response.data.token;
      setToken(authToken);
      sessionStorage.setItem("token", authToken);
      const decodedToken = jwtDecode(authToken);
      
      setUser({ 
        email: email, 
        accountType: decodedToken["accountType"] 
      });

      alert(response.data.message);
      navigate(decodedToken.accountType === "consultant" ? "/dashboard" : "/");
      return response.data;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        login, 
        register, 
        logout, 
        user, 
        token,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);