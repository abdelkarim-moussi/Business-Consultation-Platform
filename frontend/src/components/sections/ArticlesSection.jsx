import { motion } from "framer-motion";
import ArticleCard from "../article.components/ArticleCard";

  const ArticlesSection = ({ data, loading, currentPage, articlesPerPage }) => {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-[300px]"
      >
        <h1>Loading...</h1>
      </motion.div>
    );
  }

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = data.slice(indexOfFirstArticle, indexOfLastArticle);

  if (currentArticles.length <= 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-[300px]"
      >
        <h1 className="text-center capitalize">no articles available now !</h1>
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-5 px-5 md:px-10 py-10">
        {currentArticles.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <ArticleCard article={article} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ArticlesSection;
