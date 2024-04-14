// HOME PAGE: returns data from API to App.jsx (+ ISO codes, continents, currencies & languages arrays), then automatically navigates to Sorted Countries Page (sorted by ascending name)

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";
// import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ThumbnailComponent from "../../components/Thumbnail/ThumbnailComponent";
// Functions
import getContinentsArray from "../../utils/getContinentsArray";
import getCurrenciesArray from "../../utils/getCurrenciesArray";
import getLanguagesArray from "../../utils/getLanguagesArray";

const HomePage = ({
  url,
  setIsoCodes,
  setContinents,
  setLanguages,
  setCurrencies,
}) => {
  const navigate = useNavigate();
  // States
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = (await axios.get(`${url}/countries`)).data;
        setData(data);
        //
        // Get & set ISO codes
        const isoCodes = [];
        for (let i = 0; i < data.length; i++) {
          isoCodes.push([data[i].cca3, data[i].name.common]);
        }
        setIsoCodes(isoCodes);
        //
        // Get & set continents (regions & subregions)
        const continents = [];
        for (let i = 0; i < data.length; i++) {
          continents.push({
            region: data[i].region,
            subregion: data[i].subregion,
          });
        }
        setContinents(getContinentsArray(continents));
        //
        // Get & set currencies
        const currencies = [];
        for (let i = 0; i < data.length; i++) {
          currencies.push({ currencies: data[i].currencies });
        }
        setCurrencies(getCurrenciesArray(currencies));
        //
        // Get & set languages
        const languages = [];
        for (let i = 0; i < data.length; i++) {
          languages.push({ languages: data[i].languages });
        }
        setLanguages(getLanguagesArray(languages));
      } catch (error) {
        navigate("/");
        console.log("Home page, error: ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="sorted-page container">
      <div className="search-button-div flex-row">
        <button
          className="search-button"
          onClick={() => {
            navigate("/countries/sort?name=asc&page=1");
          }}
        >
          Search
        </button>
      </div>
      <div className="sorted-thumbnails flex-row">
        {data.slice((page - 1) * 20, page * 20).map((country, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/country/${country.name.official}`, {
                  state: {
                    from: "/",
                  },
                });
              }}
            >
              <ThumbnailComponent
                index={index}
                country={country}
                page={page}
                // Any name => displays pop & area
                name="name"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default HomePage;
