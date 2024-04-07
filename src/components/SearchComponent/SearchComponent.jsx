// SEARCH COMPONENT: sort select (name, population, area) + search by name form + 3 selects (continent, language, currency search)

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchComponent = ({
  setIsLoading,
  setOption,
  setPage,
  setPageTitle,
  setSearchParams,
  // Sort
  setName,
  setPop,
  setArea,
  // Search
  setNameSearch,
  // Regions & subregions array, searched continent
  continents,
  setContinent,
  // Languages array, searched language
  languages,
  setLanguage,
  // Currencies array, searched currency
  currencies,
  setCurrency,
}) => {
  const navigate = useNavigate();

  // STATES: name search
  const [nameValue, setNameValue] = useState("");

  // ARRAYS FOR SELECTS

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

  // Language search: array for select
  // console.log("search comp, languages array: ", languages);
  const selectLanguages = [];
  for (let i = 0; i < languages.length; i++) {
    selectLanguages.push({
      value: languages[i].lang,
      label: languages[i].lang,
    });
  }

  // Currency search: array for select
  const selectCurrencies = [];
  for (let i = 0; i < currencies.length; i++) {
    selectCurrencies.push({
      value: currencies[i].abbr,
      label: currencies[i].name,
    });
  }

  // SORT & SEARCH FUNCTIONS

  // Function: Name, population, area sort
  const handleSortSelect = (event) => {
    setOption(event.value);
    setIsLoading(true);
    setPage(1);
    const arr = event.value.split("-");
    // Name sort
    if (arr[0] === "name") {
      if (arr[1] === "asc") {
        setPageTitle("Alphabetical order");
      } else if (arr[1] === "desc") {
        setPageTitle("Descending alphabetical order");
      }
      setSearchParams({ name: arr[1] });
      setName(arr[1]);
      setPop("");
      setArea("");
      setNameSearch("");
      setContinent("");
      setLanguage("");
      setCurrency("");

      navigate(`/countries/sort?name=${arr[1]}`);
    }
    // Pop sort
    if (arr[0] === "pop") {
      if (arr[1] === "asc") {
        setPageTitle("Population : ascending order");
      } else if (arr[1] === "desc") {
        setPageTitle("Population : descending order");
      }
      setSearchParams({ pop: arr[1] });
      setPop(arr[1]);
      setName("");
      setArea("");
      setNameSearch("");
      setContinent("");
      setLanguage("");
      setCurrency("");

      navigate(`/countries/sort?pop=${arr[1]}`);
    }
    // Area sort
    if (arr[0] === "area") {
      if (arr[1] === "asc") {
        setPageTitle("Area : ascending order");
      } else if (arr[1] === "desc") {
        setPageTitle("Area : descending order");
      }
      setSearchParams({ area: arr[1] });
      setArea(arr[1]);
      setName("");
      setPop("");
      setNameSearch("");
      setContinent("");
      setLanguage("");
      setCurrency("");

      navigate(`/countries/sort?area=${arr[1]}`);
    }
  };

  // Function: Name search
  const handleSubmit = (event) => {
    event.preventDefault();
    setPageTitle(`Search by name : '${nameValue}'`);
    setIsLoading(true);
    setPage(1);
    setSearchParams({ namesearch: nameValue });
    setNameSearch(nameValue);
    setName("");
    setPop("");
    setArea("");
    setContinent("");
    setLanguage("");
    setCurrency("");

    navigate(`/countries/search?namesearch=${nameValue}`);
  };

  // Function: continent search
  const handleContinentSelect = (event) => {
    console.log(event.value);
    setPageTitle(event.value);
    setIsLoading(true);
    setPage(1);
    setSearchParams({ cont: event.value });
    setContinent(event.value);
    setName("");
    setPop("");
    setArea("");
    setNameSearch("");
    setLanguage("");
    setCurrency("");

    navigate(`/countries/search?cont=${event.value}`);
  };

  // Function: language search
  const handleLanguageSelect = (event) => {
    setPageTitle(`Language : ${event.value}`);
    setIsLoading(true);
    setPage(1);
    setSearchParams({ lang: event.value });
    setLanguage(event.value);
    setName("");
    setPop("");
    setArea("");
    setNameSearch("");
    setContinent("");
    setCurrency("");

    navigate(`/countries/search?lang=${event.value}`);
  };

  // Function: currency search
  const handleCurrencySelect = (event) => {
    setPageTitle(`Currency : ${event.label}`);
    setIsLoading(true);
    setPage(1);
    setSearchParams({ curr: event.value });
    setCurrency(event.value);
    setName("");
    setPop("");
    setArea("");
    setNameSearch("");
    setContinent("");
    setLanguage("");

    navigate(`/countries/search?curr=${event.value}`);
  };

  // COMPONENT

  return (
    <>
      <div className="search-comp flex-row">
        {/* Sort select */}
        <Select
          className="select sort-select"
          placeholder="Sort by name, population, area"
          options={selectOptions}
          onChange={handleSortSelect}
          getOptionLabel={(event) => {
            return (
              <div className="flex-row">
                <p>{event.label}</p>
                <p>{event.icon}</p>
              </div>
            );
          }}
        />

        {/* Search by name form */}
        <form className="name-search-form flex-row" onSubmit={handleSubmit}>
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
          className="select cont-search-select"
          placeholder="Search by continent"
          options={selectContinents}
          onChange={handleContinentSelect}
          getOptionLabel={(event) => {
            return <p>{event.label}</p>;
          }}
        />

        {/* Search by language select */}
        <Select
          className="select lang-search-select"
          placeholder="Search by language"
          options={selectLanguages}
          onChange={handleLanguageSelect}
          getOptionLabel={(event) => {
            return <p>{event.label}</p>;
          }}
        />

        {/* Search by currency select */}
        <Select
          className="select curr-search-select"
          placeholder="Search by currency"
          options={selectCurrencies}
          onChange={handleCurrencySelect}
          getOptionLabel={(event) => {
            return <p>{event.label}</p>;
          }}
        />
      </div>
    </>
  );
};

export default SearchComponent;
