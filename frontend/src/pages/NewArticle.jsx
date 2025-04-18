import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";
import ArticleEditor from "../components/ArticleEditor";

export default function NewArticle() {
  return (
    <div className="flex">
      <Sidebar active="New Article"/>
      <div className="w-full">
        <DashboardHeader />
        <ArticleEditor />
      </div>
    </div>
  );
}
