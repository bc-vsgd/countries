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
  setName,
  setPop,
  setArea,
}) => {
  const navigate = useNavigate();

  // Array of select options
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
  // Name, population, area sort
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
        <Select
          className="sort-select"
          placeholder="Sort by"
          value={option}
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
      </div>
    </>
  );
};

export default SearchComponent;
