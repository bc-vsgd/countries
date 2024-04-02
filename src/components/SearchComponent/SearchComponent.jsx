import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchComponent = ({
  setIsLoading,
  option,
  setOption,
  setPage,
  setSearchParams,
  // Sort
  setName,
  setPop,
  setArea,
  // Search
  setNameSearch,
  // Regions & subregions array
  continents,
  // Searched continent
  setContinent,
}) => {
  const navigate = useNavigate();
  // console.log("option: ", option);
  // console.log("search comp, continents array: ", continents);

  // States: name search
  const [nameValue, setNameValue] = useState("");
  // Continent search
  const [selectedCont, setSelectedCont] = useState("");

  // Array of select options for name, pop & area sort
  const selectOptions = [
    {
      value: "name-asc",
      label: "Alphabetical order",
      icon: <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" />,
    },
    {
      value: "name-desc",
      label: "Alphabetical order",
      icon: <FontAwesomeIcon icon="fa-solid fa-arrow-turn-down" />,
    },
    {
      value: "pop-asc",
      label: "Population",
      icon: <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" />,
    },
    {
      value: "pop-desc",
      label: "Population",
      icon: <FontAwesomeIcon icon="fa-solid fa-arrow-turn-down" />,
    },
    {
      value: "area-asc",
      label: "Area",
      icon: <FontAwesomeIcon icon="fa-solid fa-arrow-turn-up" />,
    },
    {
      value: "area-desc",
      label: "Area",
      icon: <FontAwesomeIcon icon="fa-solid fa-arrow-turn-down" />,
    },
  ];

  // Continent search: array for select
  const selectContinents = [];
  for (let i = 0; i < continents.length; i++) {
    for (const [key, value] of Object.entries(continents[i])) {
      if (key === "region") {
        selectContinents.push({ value: value, label: value.toUpperCase() });
      } else if (key === "subregion") {
        selectContinents.push({ value: value, label: value });
      }
    }
  }

  // Sort & search functions

  // Function: Name, population, area sort
  const handleSortSelect = (event) => {
    // console.log("value: ", event.value);
    setOption(event.value);
    setIsLoading(true);
    setPage(1);
    const arr = event.value.split("-");
    // Name sort
    if (arr[0] === "name") {
      setSearchParams({ name: arr[1] });
      setName(arr[1]);
      setPop("");
      setArea("");
      setNameSearch("");
      setContinent("");

      navigate(`/countries/sort?name=${arr[1]}`);
    }
    // Pop sort
    if (arr[0] === "pop") {
      setSearchParams({ pop: arr[1] });
      setPop(arr[1]);
      setName("");
      setArea("");
      setNameSearch("");
      setContinent("");

      navigate(`/countries/sort?pop=${arr[1]}`);
    }
    // Area sort
    if (arr[0] === "area") {
      setSearchParams({ area: arr[1] });
      setArea(arr[1]);
      setName("");
      setPop("");
      setNameSearch("");
      setContinent("");

      navigate(`/countries/sort?area=${arr[1]}`);
    }
  };

  // Function: Name search
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setPage(1);
    setSearchParams({ namesearch: nameValue });
    setNameSearch(nameValue);
    setName("");
    setPop("");
    setArea("");
    setContinent("");

    navigate(`/countries/search?namesearch=${nameValue}`);
  };

  const handleContinentSelect = (event) => {
    console.log(event.value);
    setIsLoading(true);
    setPage(1);
    setSearchParams({ cont: event.value });
    setContinent(event.value);
    setName("");
    setPop("");
    setArea("");
    setNameSearch("");

    navigate(`/countries/search?cont=${event.value}`);
  };

  return (
    <>
      <div className="search-comp flex-row">
        {/* Sort select */}
        <Select
          className="sort-select"
          placeholder="Sort by name, population, area"
          // value={option}
          options={selectOptions}
          onChange={handleSortSelect}
          getOptionLabel={(e) => {
            return (
              <div className="flex-row">
                <p>{e.label}</p>
                <p>{e.icon}</p>
              </div>
            );
          }}
        />

        {/* Search by name form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search by name"
            value={nameValue}
            onChange={(event) => {
              setNameValue(event.target.value);
            }}
          />
          <button>Search</button>
        </form>

        {/* Search by continent select */}
        <Select
          className="cont-search-select"
          placeholder="Search by continent"
          options={selectContinents}
          onChange={handleContinentSelect}
          getOptionLabel={(e) => {
            return <p>{e.label}</p>;
          }}
        />
      </div>
    </>
  );
};

export default SearchComponent;
