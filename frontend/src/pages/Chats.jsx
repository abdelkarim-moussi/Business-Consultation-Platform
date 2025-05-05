import React from "react";
import Chat from "./chat/Chat";
import { AuthProvider } from "../context/AuthContext";
import DashboardHeader from "../components/dashboards.components/DashboardHeader";
import Sidebar from "../components/Sidebar";
import NavBar from "../components/Navbar";

const Chats = () => {
  return (
    <div className="w-full">
      <AuthProvider>
        <NavBar page="chats" />
      </AuthProvider>
      <Chat />
    </div>
  );
};

export default Chats;
