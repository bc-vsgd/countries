import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SearchComponent = ({
  setPage,
  setSearchParams,
  setName,
  setPop,
  setArea,
  setNameSearch,
  setCont,
  setLang,
  setCurr,
  continents,
  languages,
  currencies,
}) => {
  // States
  const [selectOption, setSelectOption] = useState("");
  // Value of name search input
  const [nameValue, setNameValue] = useState("");
  //
  const navigate = useNavigate();

  // Name, population, area sort
  const handleSortSelect = (event) => {
    setPage(1);
    const arr = event.target.value.split("-");
    if (arr[0] === "name") {
      setSearchParams({ name: arr[1] });
      setName(arr[1]);
      setPop("");
      setArea("");
      setNameSearch("");
      setNameValue("");
      setCont("");
      setLang("");
      setCurr("");

      navigate(`/countries/sort?name=${arr[1]}`);
    }
    if (arr[0] === "pop") {
      setSearchParams({ pop: arr[1] });
      setPop(arr[1]);
      setName("");
      setArea("");
      setNameSearch("");
      setNameValue("");
      setCont("");
      setLang("");
      setCurr("");

      navigate(`/countries/sort?pop=${arr[1]}`);
    }
    if (arr[0] === "area") {
      setSearchParams({ area: arr[1] });
      setArea(arr[1]);
      setName("");
      setPop("");
      setNameSearch("");
      setNameValue("");
      setCont("");
      setLang("");
      setCurr("");

      navigate(`/countries/sort?area=${arr[1]}`);
    }
  };

  // Search by name
  const handleNameSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setNameSearch(nameValue);
    setSearchParams({ namesearch: nameValue });
    setName("");
    setPop("");
    setArea("");
    setCont("");
    setLang("");
    setCurr("");

    navigate(`/countries/sort?namesearch=${nameValue}`);
  };
  // Continent / language / currency => display 2nd <select>
  const handleSearchSelect = (event) => {
    const value = event.target.value;
    setSelectOption(value);
  };

  // Continent search
  const handleContinentSearch = (event) => {
    const continent = event.target.value;
    setPage(1);
    setSearchParams({ cont: continent });
    setCont(continent);
    setPop("");
    setName("");
    setArea("");
    setNameSearch("");
    setNameValue("");

    setLang("");
    setCurr("");

    navigate(`/countries/sort?cont=${continent}`);
  };

  // Language search
  const handleLanguageSearch = (event) => {
    setPage(1);
    const language = event.target.value;
    setSearchParams({ lang: language });
    setLang(language);
    setName("");
    setPop("");
    setArea("");
    setNameSearch("");
    setNameValue("");
    setCont("");
    setCurr("");
    navigate(`/countries/sort?lang=${language}`);
  };

  // Currency search
  const handleCurrencySearch = (event) => {
    setPage(1);
    const currency = event.target.value.toLowerCase();
    setSearchParams({ curr: currency });
    setCurr(currency);
    setName("");
    setPop("");
    setArea("");
    setNameSearch("");
    setNameValue("");
    setCont("");
    setLang("");
    navigate(`/countries/sort?curr=${currency}`);
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
      {/* Search select */}
      <div>
        {/* Search by name */}
        <form onSubmit={handleNameSearch}>
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
        {/* Select: continent / language / currency */}
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
          <select name="" id="" size={10} onChange={handleLanguageSearch}>
            {languages.map((language, index) => {
              return (
                <option value={language.lang} key={index}>
                  {language.lang}
                </option>
              );
            })}
          </select>
        )}
        {/* Currencies select */}
        {selectOption === "currency" && (
          <select name="" id="" size={10} onChange={handleCurrencySearch}>
            {currencies.map((currency, index) => {
              return (
                <option value={currency.name} key={index}>
                  {currency.name}
                </option>
              );
            })}
          </select>
        )}
      </div>
    </>
  );
};

export default SearchComponent;
