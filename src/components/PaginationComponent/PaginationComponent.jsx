import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaginationComponent = ({
  page,
  setPage,
  maxPage,
  name,
  pop,
  area,
  nameSearch,
  continent,
  language,
  currency,
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
            if (nameSearch) {
              setSearchParams({
                namesearch: nameSearch,
                page: page - 1,
              });
            }
            if (continent) {
              setSearchParams({
                cont: continent,
                page: page - 1,
              });
            }
            if (language) {
              setSearchParams({
                lang: language,
                page: page - 1,
              });
            }
            if (currency) {
              setSearchParams({
                curr: currency,
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
            if (nameSearch) {
              setSearchParams({
                namesearch: nameSearch,
                page: page + 1,
              });
            }
            if (continent) {
              setSearchParams({
                cont: continent,
                page: page + 1,
              });
            }
            if (language) {
              setSearchParams({
                lang: language,
                page: page + 1,
              });
            }
            if (currency) {
              setSearchParams({
                curr: currency,
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
