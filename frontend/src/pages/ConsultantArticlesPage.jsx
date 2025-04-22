import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ConsultantArticles from "../components/ConsultantArticles";
import EditArticle from "../components/EditArticle";

export default function ConsultantArticlesPage() {
  return (
    <div className="flex h-full">
      <Sidebar active="consultantArticles" />
      <div className="w-full">
        <DashboardHeader />
        <ConsultantArticles />
        
      </div>
    </div>
  );
}
