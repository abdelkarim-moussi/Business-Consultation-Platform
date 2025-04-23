import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUser({
            id: decoded.sub,
            accountType: decoded.accountType,
          });
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

      const userData = {
        id: decodedToken.sub,
        email: email,
        accountType: decodedToken.accountType,
        full_name:
          response.data.user.firstname + " " + response.data.user.firstname,
      };

      setUser(userData);

      return userData;
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

      const userData = {
        id: decodedToken.sub,
        email,
        accountType: decodedToken.accountType,
        full_name:
          response.data.user.firstname + " " + response.data.user.firstname,
      };

      setUser(userData);

      return { ...response.data, user: userData };
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken("");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
