import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blog from "./pages/Article";
import Home from "./pages/Home";
import Consultants from "./pages/Consultants";
import Register from "./pages/Register";
import ArticleDetails from "./pages/ArticleDetails";
import Dashboard from "./pages/Dashboard";
import NewArticle from "./pages/NewArticle";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

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
            path="/dashboard"
            element={
              <AuthProvider>
                <ProtectedRoute roles={"consultant"}>
                  <Dashboard />
                </ProtectedRoute>
              </AuthProvider>
            }
          />
          {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
          <Route path="/createarticle" element={<NewArticle />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
