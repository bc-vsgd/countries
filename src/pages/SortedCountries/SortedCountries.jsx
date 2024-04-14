// SORTED COUNTRIES PAGE: main page, displays countries according to sort or search (default: alphabetical display)
// Contains: Search component + pagination component + list of links, each containing a thumbnail and leading to country page

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ThumbnailComponent from "../../components/Thumbnail/ThumbnailComponent";

// const SortedCountries = ({ url }) => {
const SortedCountries = ({
  url,
  isoCodes,
  continents,
  languages,
  currencies,
}) => {
  const navigate = useNavigate();

  // STATES
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Total number of pages
  const [maxPage, setMaxPage] = useState(1);
  // Page title
  const [pageTitle, setPageTitle] = useState("");

  // Sort option
  const [option, setOption] = useState("name-asc");
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
      if (name) {
        try {
          const { data } = await axios.get(
            `${url}/countries/sort?name=${name}&page=${page}`
          );
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        } catch (error) {
          navigate(`/countries/sort?name=${name}&page=${page}`);
        }
      }
      if (pop) {
        try {
          const { data } = await axios.get(
            `${url}/countries/sort?pop=${pop}&page=${page}`
          );
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        } catch (error) {
          navigate(`/countries/sort?pop=${pop}&page=${page}`);
        }
      }
      if (area) {
        try {
          const { data } = await axios.get(
            `${url}/countries/sort?area=${area}&page=${page}`
          );
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        } catch (error) {
          navigate(`/countries/sort?area=${area}&page=${page}`);
        }
      }

      if (nameSearch) {
        try {
          const { data } = await axios.get(
            `${url}/countries/search?namesearch=${nameSearch}`
          );
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        } catch (error) {
          navigate(`/countries/search?namesearch=${nameSearch}`);
        }
      }
      if (continent) {
        try {
          const { data } = await axios.get(
            `${url}/countries/search?cont=${continent}`
          );
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        } catch (error) {
          navigate(`/countries/search?cont=${continent}`);
        }
      }
      if (language) {
        try {
          const { data } = await axios.get(
            `${url}/countries/search?lang=${language}`
          );
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        } catch (error) {
          navigate(`/countries/search?lang=${language}`);
        }
      }
      if (currency) {
        try {
          const { data } = await axios.get(
            `${url}/countries/search?curr=${currency}`
          );
          setData(data.data);
          setMaxPage(Math.ceil(data.data.length / 20));
        } catch (error) {
          navigate(`/countries/search?curr=${currency}`);
        }
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
        // selected continent
        setContinent={setContinent}
        // selected language
        setLanguage={setLanguage}
        // selected currency
        setCurrency={setCurrency}
        //
        isoCodes={isoCodes}
        continents={continents}
        languages={languages}
        currencies={currencies}
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
              <div
                key={index}
                onClick={() => {
                  navigate(`/country/${country.name.official}`, {
                    state: {
                      from: `/countries/sort?name=${name}&pop=${pop}&area=${area}&page=${page}`,
                    },
                  });
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
              </div>
            ) : // Name search
            nameSearch ? (
              <div
                key={index}
                onClick={() => {
                  navigate(`/country/${country.name.official}`, {
                    state: {
                      from: `/countries/search?namesearch=${nameSearch}&page=${page}`,
                    },
                  });
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
              </div>
            ) : // Continent search
            continent ? (
              <div
                key={index}
                onClick={() => {
                  navigate(`/country/${country.name.official}`, {
                    state: {
                      from: `/countries/search?cont=${continent}&page=${page}`,
                    },
                  });
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
              </div>
            ) : // Language search
            language ? (
              <div
                key={index}
                onClick={() => {
                  navigate(`/country/${country.name.official}`, {
                    state: {
                      from: `/countries/search?lang=${language}&page=${page}`,
                    },
                  });
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
              </div>
            ) : (
              // Currency search
              currency && (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/country/${country.name.official}`, {
                      state: {
                        from: `/countries/search?curr=${currency}&page=${page}`,
                      },
                    });
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
                </div>
              )
            )
          );
        })}
      </div>
    </div>
  );
};
export default SortedCountries;
