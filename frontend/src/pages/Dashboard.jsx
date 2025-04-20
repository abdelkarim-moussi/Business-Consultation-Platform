import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ConsultantStats from "../components/ConsultantStats";

export default function Dashboard() {
  return (
    <div className="flex h-full">
      <Sidebar active="dashboard" />
      <div className="w-full">
        <DashboardHeader />
        <ConsultantStats />
      </div>
    </div>
  );
}
