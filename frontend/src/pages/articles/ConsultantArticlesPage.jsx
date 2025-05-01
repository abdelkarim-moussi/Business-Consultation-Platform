import React from "react";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
import ConsultantArticles from "../../components/consultant.components/ConsultantArticles";
import { AuthProvider } from "../../context/AuthContext";

export default function ConsultantArticlesPage() {
  return (
    <div className="flex h-full">
      <Sidebar active="consultant/articles" />
      <div className="w-full">
        <AuthProvider>
          <DashboardHeader page="Articles"/>
        </AuthProvider>
        <ConsultantArticles />
      </div>
    </div>
  );
}
