import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleSection = ({ data, loading, currentPage, articlesPerPage }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Calculate the index range for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-5 px-5 md:px-10 py-10">
        {currentArticles.map((article) => (
          <ArticleCard title={article.title} key={article.id} />
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
