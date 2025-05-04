import React from "react";
import EntrepreneurConsultations from "../../components/entrepreneur.components/EntrepreneurConsultations";
import { AuthProvider } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import EntrepreneurStats from "../../components/entrepreneur.components/EntrepreneurStats";

const EntrepreneurDashboard = () => {
  return (
    <div className="flex h-ful">
      <div className="w-full">
        <AuthProvider>
          <Navbar />
          <EntrepreneurStats />
          <EntrepreneurConsultations />
        </AuthProvider>
      </div>
    </div>
  );
};

export default EntrepreneurDashboard;
