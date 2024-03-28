const PaginationComponent = ({
  page,
  setPage,
  maxPage,
  name,
  pop,
  area,
  setSearchParams,
}) => {
  return (
    <div className="flex-row">
      <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
            setSearchParams({
              page: page - 1,
              name: name,
              pop: pop,
              area: area,
            });
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
            setSearchParams({
              page: page + 1,
              name: name,
              pop: pop,
              area: area,
            });
          }
        }}
      >
        +
      </button>
    </div>
  );
};

export default PaginationComponent;
