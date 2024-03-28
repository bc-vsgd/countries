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
      <select name="sort" id="sort-select" onChange={handleSortSelect}>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="pop-asc">Population +</option>
        <option value="pop-desc">Population -</option>
        <option value="area-asc">Area +</option>
        <option value="area-desc">Area -</option>
      </select>
    </>
  );
};

export default SearchComponent;
