// PAGINATION COMPONENT: pagination buttons ("<"" & ">"") + page title (h1)

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
  pageTitle,
}) => {
  return (
    <div className="pagination-comp flex-row">
      <div className="buttons-div flex-row">
        {page > 1 ? (
          <div>
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
          </div>
        ) : (
          // Empty div (page === 1)
          <div></div>
        )}
        <p>{page}</p>

        {page < maxPage ? (
          <div>
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
              <FontAwesomeIcon
                icon="fa-solid fa-angle-right"
                className="icon"
              />
            </button>
          </div>
        ) : (
          // Page === max page => empty div
          <div></div>
        )}
      </div>
      <div className="title-div flex-row">
        <h1>
          <span>{pageTitle}</span>
        </h1>
      </div>
    </div>
  );
};

export default PaginationComponent;
