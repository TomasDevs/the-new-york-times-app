import React, { useState, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Articles.css";
import ArticleItem from "./ArticleItem";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

const Articles = () => {
  // State to store the list of articles
  const [articles, setArticles] = useState([]);
  // State to handle which page of articles is currently shown
  const [currentPage, setCurrentPage] = useState(1);
  // State to show if data is still loading
  const [loading, setLoading] = useState(true);
  // Number of articles to show per page
  const articlesPerPage = 8;

  useEffect(() => {
    // Function to get articles from the backend
    const fetchArticles = async () => {
      try {
        // Fetch articles from the local backend
        // const response = await fetch(
        //   `${process.env.REACT_APP_API_URL}/api/articles`
        // );
        // Fetch articles from the New York Times API
        const response = await fetch(
          `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API_KEY}`
        );
        const data = await response.json();
        if (data.results) {
          // Stop showing the loading message after getting data
          setLoading(false);
          // Add a small delay to make the animation work when articles are first shown
          setTimeout(() => {
            setArticles(data.results);
          }, 100);
        } else {
          console.error("No results found in response:", data);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []); // The empty array makes this effect run only once when the component loads

  // Find out the indexes for the articles that should be shown on this page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Find out how many pages are needed for all the articles
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <div className="articles">
      <h2 className="article-heading">Today's Top Stories</h2>
      {loading ? (
        // Show this message while the articles are loading
        <Spinner />
      ) : (
        // Show the list of articles with animation when they appear or disappear
        <TransitionGroup component="ul" className="articles-list">
          {currentArticles.map((article, index) => (
            <CSSTransition
              key={index}
              timeout={500}
              classNames="article"
              unmountOnExit>
              <ArticleItem article={article} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      )}

      {/* Show pagination buttons only if there are more pages */}
      {!loading && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Articles;
