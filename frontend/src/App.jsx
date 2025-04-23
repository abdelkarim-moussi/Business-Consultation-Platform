import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Articles";
import Home from "./pages/Home";
import Consultants from "./pages/Consultants";
import Register from "./pages/Register";
import ArticleDetails from "./pages/ArticleDetails";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import NewArticle from "./pages/NewArticle";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ConsultantArticlesPage from "./pages/consultantArticlesPage";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/consultants" element={<Consultants />} />
          <Route path="/blog" element={<Blog />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route path="/details" element={<ArticleDetails />} />

          <Route
            path="/consultantDash"
            element={
              <ProtectedRoute roles={["consultant"]}>
                <ConsultantDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createarticle"
            element={
              <ProtectedRoute>
                <NewArticle />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultantArticles"
            element={
              <ProtectedRoute>
                <ConsultantArticlesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/Consultconsultations"
            element={
              <ProtectedRoute>
                <ConsultantArticlesPage />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
