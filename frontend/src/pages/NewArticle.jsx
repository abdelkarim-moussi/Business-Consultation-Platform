import React from "react";
import Sidebar from "../components/Sidebar";
import DashboardHeader from "../components/DashboardHeader";
import ArticleEditor from "../components/ArticleEditor";

export default function NewArticle() {
  return (
    <div className="flex">
      <Sidebar active="createarticle"/>
      <div className="w-full">
        <DashboardHeader />
        <ArticleEditor />
      </div>
    </div>
  );
}
