import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ConsultantStats from "../components/ConsultantStats";

export default function ConsultantDashboard() {
  return (
    <div className="flex h-full">
      <Sidebar active="consultantDash" />
      <div className="w-full">
        <DashboardHeader />
        <ConsultantStats />
      </div>
    </div>
  );
}
