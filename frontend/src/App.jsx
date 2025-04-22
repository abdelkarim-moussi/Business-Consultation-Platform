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
import ConsultantArticles from "./components/ConsultantArticles";
import ConsultantArticlesPage from "./pages/consultantArticlesPage";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/consultants" element={<Consultants />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route
            path="/login"
            element={
              <AuthProvider>
                <PublicRoute>
                  <Login />
                </PublicRoute>
              </AuthProvider>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <AuthProvider>
                <PublicRoute path="/register">
                  <Register />
                </PublicRoute>
              </AuthProvider>
            }
          ></Route>
          <Route path="/details" element={<ArticleDetails />}></Route>

          <Route
            path="/consultantDash"
            element={
              <AuthProvider>
                <ProtectedRoute roles={"consultant"}>
                  <ConsultantDashboard />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
          <Route
            path="/createarticle"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <NewArticle />
                </ProtectedRoute>
              </AuthProvider>
            }
          ></Route>
          <Route
            path="/consultantArticles"
            element={
              <AuthProvider>
                <ProtectedRoute>
                  <ConsultantArticlesPage />
                </ProtectedRoute>
              </AuthProvider>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
