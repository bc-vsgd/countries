import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="pagination-comp flex-row">
      <button
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);

            if (name) {
              setSearchParams({
                name: name,
                page: page - 1,
              });
            }
            if (pop) {
              setSearchParams({
                pop: pop,
                page: page - 1,
              });
            }
            if (area) {
              setSearchParams({
                area: area,
                page: page - 1,
              });
            }
          }
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-angle-left" className="icon" />
      </button>
      <p>{page}</p>
      <button
        onClick={() => {
          if (page < maxPage) {
            setPage(page + 1);

            if (name) {
              setSearchParams({
                name: name,
                page: page + 1,
              });
            }
            if (pop) {
              setSearchParams({
                pop: pop,
                page: page + 1,
              });
            }
            if (area) {
              setSearchParams({
                area: area,
                page: page + 1,
              });
            }
          }
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-angle-right" className="icon" />
      </button>
    </div>
  );
};

export default PaginationComponent;
