import React, { useState, useEffect } from "react";
import "./Articles.css";
import ArticleItem from "./ArticleItem";
import Pagination from "./Pagination";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/articles");
        const data = await response.json();
        if (data.results) {
          setArticles(data.results);
        } else {
          console.error("No results found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="articles">
      <h2 className="article-heading">Today's Top Stories</h2>
      <ul className="articles-list">
        {Array.isArray(currentArticles) && currentArticles.length > 0 ? (
          currentArticles.map((article, index) => (
            <ArticleItem key={index} article={article} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Articles;
