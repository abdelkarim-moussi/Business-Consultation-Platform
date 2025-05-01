import React, { useState, useEffect } from "react";
import { AuthProvider } from "../../context/AuthContext";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
import ConsultantConsultations from "../../components/consultant.components/ConsultantConsultations";
import Sidebar from "../../components/Sidebar";

const ConsultantConsultationsPage = () => {
  return (
    <div className="flex h-ful">
      <Sidebar active="consultant/consultations" />
      <div className="w-full">
        <AuthProvider>
          <DashboardHeader page="Consulations" />
          <ConsultantConsultations />
        </AuthProvider>
      </div>
    </div>
  );
};

export default ConsultantConsultationsPage;
