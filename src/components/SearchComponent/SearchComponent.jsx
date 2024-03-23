import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchComponent = ({
  setPage,
  setSearchParams,
  setName,
  setPop,
  setArea,
  continents,
  languages,
  currencies,
}) => {
  // States
  const [selectOption, setSelectOption] = useState("");
  //
  const navigate = useNavigate();

  const handleSortSelect = (event) => {
    setPage(1);
    const arr = event.target.value.split("-");
    // console.log("arr", arr);
    if (arr[0] === "name") {
      setSearchParams({ name: arr[1] });
      setName(arr[1]);
      setPop("");
      setArea("");
      navigate(`/countries/sort?name=${arr[1]}`);
    }
    if (arr[0] === "pop") {
      setSearchParams({ pop: arr[1] });
      setPop(arr[1]);
      setName("");
      setArea("");
      navigate(`/countries/sort?pop=${arr[1]}`);
    }
    if (arr[0] === "area") {
      setArea(arr[1]);
      setName("");
      setPop("");
      navigate(`/countries/sort?area=${arr[1]}`);
    }
  };

  const handleSearchSelect = (event) => {
    const value = event.target.value;
    setSelectOption(value);
  };

  const handleContinentSearch = (event) => {
    // console.log("search continent");
    const value = event.target.value;
    // console.log("value: ", value);
    navigate("/countries/search");
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
      {/* Search */}
      <div>
        <div>
          <input type="text" placeholder="Search by name" />
          <button>Search</button>
        </div>
        <select name="search" id="search-select" onChange={handleSearchSelect}>
          <option value="">Search by</option>
          <option value="continent">Continent</option>
          <option value="language">Language</option>
          <option value="currency">Currency</option>
        </select>
        {/* Continents select */}
        {selectOption === "continent" && (
          <select name="" id="" size={10} onChange={handleContinentSearch}>
            {continents.map((cont, index) => {
              // region: upper case
              return cont.region ? (
                <option value={cont.region} key={index}>
                  {cont.region.toUpperCase()}
                </option>
              ) : (
                <option value={cont.subregion} key={index}>
                  {cont.subregion}
                </option>
              );
            })}
          </select>
        )}
        {/* Languages select */}
        {selectOption === "language" && (
          <select name="" id="">
            <option value="">{languages[0].lang}</option>
          </select>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
