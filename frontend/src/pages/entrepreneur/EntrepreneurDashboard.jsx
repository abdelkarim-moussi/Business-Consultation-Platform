import React from "react";
import EntrepreneurConsultations from "../../components/entrepreneur.components/EntrepreneurConsultations";
import { AuthProvider } from "../../context/AuthContext";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";

const EntrepreneurDashboard = () => {
  return (
    <div className="flex h-ful">
      <div className="w-full">
        <AuthProvider>
          <DashboardHeader page="Consulations" />
          <EntrepreneurConsultations />
        </AuthProvider>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
