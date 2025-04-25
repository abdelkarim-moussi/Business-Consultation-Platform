import React from "react";
import Sidebar from "../../components/Sidebar";
import DashboardHeader from "../../components/dashboards.components/DashboardHeader";
import ArticleEditor from "../../components/article.components/ArticleEditor";

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
