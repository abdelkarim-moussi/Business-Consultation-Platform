import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Blog from "./pages/articles/Articles";
import Home from "./pages/Home";
import Consultants from "./pages/consultants/Consultants";
import Register from "./pages/auth/Register";
import ArticleDetails from "./pages/Articles/ArticleDetails";
import ConsultantDashboard from "./pages/consultants/ConsultantDashboard";
import NewArticle from "./pages/articles/NewArticle";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ConsultantArticlesPage from "./pages/articles/consultantArticlesPage";
import UserProfile from "./pages/auth/UserProfile";
import ConsultantDetails from "./pages/consultants/ConsultantDetails";
import {ToastContainer} from "react-toastify";

export default function App() {
  return (
    <>
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

            <Route path="/article_details" element={<ArticleDetails />} />

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
            <Route path="/consultants/:id" element={<ConsultantDetails />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>


      <ToastContainer />
    </>
  );
}
