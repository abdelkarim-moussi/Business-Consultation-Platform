import React from "react";
import Chat from "./chat/Chat";
import { AuthProvider } from "../context/AuthContext";
import DashboardHeader from "../components/dashboards.components/DashboardHeader";
import Sidebar from "../components/Sidebar";

const Chats = () => {
  return (
    <div className="flex h-full">
      <Sidebar active="chats" />
      <div className="w-full">
        <AuthProvider>
          <DashboardHeader page="chats" />
        </AuthProvider>
        <Chat />
      </div>
    </div>
  );
};

export default Chats;
