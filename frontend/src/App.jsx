import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Blog from "./pages/articles/Articles";
import Home from "./pages/Home";
import Consultants from "./pages/consultants/Consultants";
import Register from "./pages/auth/Register";
import ConsultantDashboard from "./pages/consultants/ConsultantDashboard";
import NewArticle from "./pages/articles/NewArticle";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import ConsultantArticlesPage from "./pages/articles/consultantArticlesPage";
import UserProfile from "./pages/auth/UserProfile";
import ConsultantDetails from "./pages/consultants/ConsultantDetails";
import { ToastContainer } from "react-toastify";
import ArticleDetails from "./pages/articles/ArticleDetails";
import ConsultantConsultationsPage from "./pages/consultations/ConsultantConsultationsPage";
import Chats from "./pages/Chats";
import EntrepreneurDashboard from "./pages/entrepreneur/EntrepreneurDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import ArticlesManagement from "./pages/admin/ArticlesManagement";
import CategoriesManagement from "./pages/admin/CategoriesManagement";

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

            <Route
              path="/consultantDash"
              element={
                <ProtectedRoute rules={["consultant"]}>
                  <ConsultantDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/entrepreneurDash"
              element={
                <ProtectedRoute rules={["entrepreneur"]}>
                  <EntrepreneurDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/createarticle"
              element={
                <ProtectedRoute rules={["consultant"]}>
                  <NewArticle />
                </ProtectedRoute>
              }
            />

            <Route
              path="/consultant/articles"
              element={
                <ProtectedRoute rules={["consultant"]}>
                  <ConsultantArticlesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/consultant/consultations"
              element={
                <ProtectedRoute rules={["consultant"]}>
                  <ConsultantConsultationsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute rules={["consultant", "entrepreneur", "admin"]}>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route path="/consultants/:id" element={<ConsultantDetails />} />
            <Route path="/articles/:id" element={<ArticleDetails />} />
            <Route path="/chats" element={<Chats />} />

            <Route
              path="/adminDash"
              element={
                // <ProtectedRoute rules={["admin"]}>
                <AdminDashboard />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/users/management"
              element={
                // <ProtectedRoute rules={["admin"]}>
                <UsersManagement />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/articles"
              element={
                // <ProtectedRoute rules={["admin"]}>
                <ArticlesManagement />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                // <ProtectedRoute rules={["admin"]}>
                <CategoriesManagement />
                // </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

      <ToastContainer />
    </>
  );
}
