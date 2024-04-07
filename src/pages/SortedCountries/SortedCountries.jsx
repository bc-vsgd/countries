// SORTED COUNTRIES PAGE: main page, displays countries according to sort or search (default: alphabetical display)
// Contains: Search component + pagination component + list of links, each containing a thumbnail and leading to country page

import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ThumbnailComponent from "../../components/Thumbnail/ThumbnailComponent";

const SortedCountries = ({
  url,
  option,
  setOption,
  continents,
  currencies,
  languages,
}) => {
  // console.log("sorted page, continents: ", continents);
  // console.log("sorted page, currencies: ", currencies);
  // console.log("sorted page, languages: ", languages);

  // STATES
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Page title
  const [pageTitle, setPageTitle] = useState("Alphabetical order");
  // Total number of pages
  const [maxPage, setMaxPage] = useState(1);
  // Query params
  const [searchParams, setSearchParams] = useSearchParams();
  // Params: Sort: name, population, area
  const [name, setName] = useState(searchParams.get("name") || "");
  const [pop, setPop] = useState(searchParams.get("pop") || "");
  const [area, setArea] = useState(searchParams.get("area") || "");
  // Params: Search: name, continent, language, currency
  const [nameSearch, setNameSearch] = useState(
    searchParams.get("namesearch") || ""
  );
  const [continent, setContinent] = useState(searchParams.get("cont") || "");
  const [language, setLanguage] = useState(searchParams.get("lang") || "");
  const [currency, setCurrency] = useState(searchParams.get("curr") || "");
  // Params: Page
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (name) {
          const { data } = await axios.get(
            `${url}/countries/sort?name=${name}&page=${page}`
          );
          // console.log("sorted, data (name sort) >> ", data);
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (pop) {
          const { data } = await axios.get(
            `${url}/countries/sort?pop=${pop}&page=${page}`
          );
          // console.log("sorted, data (population sort) >> ", data);
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (area) {
          const { data } = await axios.get(
            `${url}/countries/sort?area=${area}&page=${page}`
          );
          // console.log("sorted, data (area sort) >> ", data);
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (nameSearch) {
          const { data } = await axios.get(
            `${url}/countries/search?namesearch=${nameSearch}`
          );
          // console.log("Sorted page, data (name search): ", data.data);
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (continent) {
          const { data } = await axios.get(
            `${url}/countries/search?cont=${continent}`
          );
          // console.log("Sorted page, data (continent search): ", data.data);
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (language) {
          const { data } = await axios.get(
            `${url}/countries/search?lang=${language}`
          );
          // console.log("Sorted page, data (language search): ", data.data);
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (currency) {
          const { data } = await axios.get(
            `${url}/countries/search?curr=${currency}`
          );
          // console.log("Sorted page, data (currency search)", data.data);
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
      } catch (error) {
        console.log("sorted page, error >>> ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [name, pop, area, page, nameSearch, continent, language, currency]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="sorted-page container">
      <SearchComponent
        setIsLoading={setIsLoading}
        option={option}
        setOption={setOption}
        setPageTitle={setPageTitle}
        setPage={setPage}
        setSearchParams={setSearchParams}
        // Name, pop or area sort
        setName={setName}
        setPop={setPop}
        setArea={setArea}
        // Name, continent, language, currency search
        setNameSearch={setNameSearch}
        // Regions & subregions array, selected continent
        continents={continents}
        setContinent={setContinent}
        // Languages array, selected language
        languages={languages}
        setLanguage={setLanguage}
        // Currencies array, selected currency
        currencies={currencies}
        setCurrency={setCurrency}
      />

      <PaginationComponent
        page={page}
        setPage={setPage}
        maxPage={maxPage}
        name={name}
        pop={pop}
        area={area}
        nameSearch={nameSearch}
        continent={continent}
        language={language}
        currency={currency}
        setSearchParams={setSearchParams}
        pageTitle={pageTitle}
      />

      {/* Countries thumbnails */}
      <div className="sorted-thumbnails flex-row">
        {data.slice((page - 1) * 20, page * 20).map((country, index) => {
          return (
            // Name, pop or area sort
            name || pop || area ? (
              <Link
                to={`/country/${country.name.official}`}
                key={index}
                state={{
                  from: `/countries/sort?name=${name}&pop=${pop}&area=${area}&page=${page}`,
                }}
              >
                <ThumbnailComponent
                  index={index}
                  country={country}
                  page={page}
                  name={name}
                  pop={pop}
                  area={area}
                  nameSearch={nameSearch}
                  continent={continent}
                  language={language}
                  currency={currency}
                />
              </Link>
            ) : // Name search
            nameSearch ? (
              <Link
                to={`/country/${country.name.official}`}
                key={index}
                state={{
                  from: `/countries/search?namesearch=${nameSearch}&page=${page}`,
                }}
              >
                <ThumbnailComponent
                  index={index}
                  country={country}
                  page={page}
                  name={name}
                  pop={pop}
                  area={area}
                  nameSearch={nameSearch}
                  continent={continent}
                  language={language}
                  currency={currency}
                />
              </Link>
            ) : // Continent search
            continent ? (
              <Link
                to={`/country/${country.name.official}`}
                key={index}
                state={{
                  from: `/countries/search?cont=${continent}&page=${page}`,
                }}
              >
                <ThumbnailComponent
                  index={index}
                  country={country}
                  page={page}
                  name={name}
                  pop={pop}
                  area={area}
                  nameSearch={nameSearch}
                  continent={continent}
                  language={language}
                  currency={currency}
                />
              </Link>
            ) : // Language search
            language ? (
              <Link
                to={`/country/${country.name.official}`}
                key={index}
                state={{
                  from: `/countries/search?lang=${language}&page=${page}`,
                }}
              >
                <ThumbnailComponent
                  index={index}
                  country={country}
                  page={page}
                  name={name}
                  pop={pop}
                  area={area}
                  nameSearch={nameSearch}
                  continent={continent}
                  language={language}
                  currency={currency}
                />
              </Link>
            ) : (
              // Currency search
              currency && (
                <Link
                  to={`/country/${country.name.official}`}
                  key={index}
                  state={{
                    from: `/countries/search?curr=${currency}&page=${page}`,
                  }}
                >
                  <ThumbnailComponent
                    index={index}
                    country={country}
                    page={page}
                    name={name}
                    pop={pop}
                    area={area}
                    nameSearch={nameSearch}
                    continent={continent}
                    language={language}
                    currency={currency}
                  />
                </Link>
              )
            )
          );
        })}
      </div>
    </div>
  );
};
export default SortedCountries;
