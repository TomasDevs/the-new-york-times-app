import "./Pagination.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={index + 1 === currentPage ? "btn active" : "btn"}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
