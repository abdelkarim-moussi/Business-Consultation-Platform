import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, rules }) => {
  const { user } = useAuth();
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (rules && !rules.includes(user.accountType)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
