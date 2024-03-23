const PaginationComponent = ({ page, setPage, maxPage }) => {
  return (
    <div className="flex-row">
      <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
          }
        }}
      >
        -
      </button>
      <p>{page}</p>
      <button
        onClick={() => {
          if (page < maxPage) {
            setPage(page + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
};

export default PaginationComponent;
