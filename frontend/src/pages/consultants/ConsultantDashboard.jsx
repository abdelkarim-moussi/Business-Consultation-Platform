import React from "react";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
import ConsultantStats from "../../components/dashboards.components/ConsultantStats";
import { AuthProvider } from "../../context/AuthContext";

export default function ConsultantDashboard() {
  return (
    <div className="flex h-full">
      <Sidebar active="consultantDash" />
      <div className="w-full">
        <AuthProvider>
          <DashboardHeader page="Dashboard"/>
        </AuthProvider>
        <ConsultantStats />
      </div>
    </div>
  );
}
