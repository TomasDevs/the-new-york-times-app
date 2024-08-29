import React, { useState, useEffect } from "react";
import "./Articles.css";

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

  // Get current articles
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
          currentArticles.map((article, index) => {
            // Formatting data
            const formattedDate = new Date(
              article.published_date
            ).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <li key={index} className="article-item">
                <a
                  href={article.url}
                  className="article-link"
                  target="_blank"
                  rel="noopener noreferrer">
                  <figure className="article-image-container">
                    <img
                      src={article.multimedia[1].url}
                      alt={article.multimedia[1].caption}
                      className="article-image"
                    />
                    <span className="tags">
                      <p className="article-section tag">{article.section}</p>
                      <p className="article-subsection tag">
                        {article.subsection}
                      </p>
                    </span>
                  </figure>
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-abstract">{article.abstract}</p>
                </a>

                <p className="article-byline">{article.byline}</p>

                <p className="article-date">{formattedDate}</p>
              </li>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </ul>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={index + 1 === currentPage ? "btn active" : "btn"}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Articles;
