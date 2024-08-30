import "./ArticleItem.css";

const ArticleItem = ({ article }) => {
  const formattedDate = new Date(article.published_date).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <li className="article-item">
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
            <p className="article-subsection tag">{article.subsection}</p>
          </span>
        </figure>
        <h3 className="article-title">{article.title}</h3>
        <p className="article-abstract">{article.abstract}</p>
      </a>

      <p className="article-byline">{article.byline}</p>

      <p className="article-date">{formattedDate}</p>
    </li>
  );
};

export default ArticleItem;
