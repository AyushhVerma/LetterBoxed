const Pagination = (props) => {
  const [page, total_pages] = props.pagehelp;
  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => props.handlePageChange(props.tag, page - 1)}
      >
        Prev
      </button>
      <span className="pagination-info">
        Page {page} of {total_pages}
      </span>
      <button
        disabled={page === total_pages}
        onClick={() => props.handlePageChange(props.tag, page + 1)}
      >
        Next
      </button>
    </div>
  )
};

export default Pagination;