import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Blog from "./pages/Article";
import Home from "./pages/Home";
import Consultants from "./pages/Consultants";
import Register from "./pages/Register";
import ArticleDetails from "./pages/ArticleDetails";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import NewArticle from "./pages/NewArticle";
import { AuthProvider } from "./context/AuthContext";

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
                <Login />
              </AuthProvider>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <AuthProvider>
                <Register />
              </AuthProvider>
            }
          ></Route>
          <Route path="/details" element={<ArticleDetails />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/createarticle" element={<NewArticle />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
