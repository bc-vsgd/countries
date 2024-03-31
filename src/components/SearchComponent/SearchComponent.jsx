import { useNavigate } from "react-router-dom";

const SearchComponent = ({
  setPage,
  setSearchParams,
  setName,
  setPop,
  setArea,
}) => {
  const navigate = useNavigate();

  // Name, population, area sort
  const handleSortSelect = (event) => {
    setPage(1);
    const arr = event.target.value.split("-");
    // Name sort
    if (arr[0] === "name") {
      setSearchParams({ name: arr[1] });
      setName(arr[1]);
      setPop("");
      setArea("");

      navigate(`/countries/sort?name=${arr[1]}`);
    }
    // Pop sort
    if (arr[0] === "pop") {
      setSearchParams({ pop: arr[1] });
      setPop(arr[1]);
      setName("");
      setArea("");

      navigate(`/countries/sort?pop=${arr[1]}`);
    }
    // Area sort
    if (arr[0] === "area") {
      setSearchParams({ area: arr[1] });
      setArea(arr[1]);
      setName("");
      setPop("");

      navigate(`/countries/sort?area=${arr[1]}`);
    }
  };

  return (
    <>
      {/* Sort select */}
      <div className="search-comp flex-row">
        <p>Sort by</p>
        <select
          name="sort"
          id="sort-select"
          className="sort-select"
          onChange={handleSortSelect}
        >
          <option value="name-asc">Alphabetical order A - Z</option>
          <option value="name-desc">Alphabetical order Z - A</option>
          <option value="pop-asc">Population: ascending order</option>
          <option value="pop-desc">Population: descending order</option>
          <option value="area-asc">Area: ascending order</option>
          <option value="area-desc">Area: descending order</option>
        </select>
      </div>
    </>
  );
};

export default SearchComponent;
