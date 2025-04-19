import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar active="dashboard"/>
      <div className="">
        <DashboardHeader />
        <DashboardCard />
      </div>
    </div>
  );
}
