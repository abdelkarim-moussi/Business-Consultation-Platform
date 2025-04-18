import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Consultants from "./pages/Consultants";
import Register from "./pages/Register";
import ArticleDetails from "./pages/ArticleDetails";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/consultants" element={<Consultants />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/details" element={<ArticleDetails />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
