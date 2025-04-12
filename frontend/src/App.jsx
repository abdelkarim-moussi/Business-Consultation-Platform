import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Consultants from "./pages/Consultants";

export default function App (){

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="consultants" element={<Consultants/>}></Route>
          <Route path="blog" element={<Blog />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

