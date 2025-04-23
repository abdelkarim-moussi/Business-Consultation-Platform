import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ConsultantArticles from "../components/ConsultantArticles";
import { AuthProvider } from "../context/AuthContext";

export default function ConsultantArticlesPage() {
  return (
    <div className="flex h-full">
      <Sidebar active="consultantArticles" />
      <div className="w-full">
        <AuthProvider>
          <DashboardHeader />
        </AuthProvider>
        <ConsultantArticles />
      </div>
    </div>
  );
}
