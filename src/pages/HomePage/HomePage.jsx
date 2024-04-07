// HOME PAGE: returns data from API to App.jsx (+ ISO codes, continents, currencies & languages arrays), then automatically navigates to Sorted Countries Page (sorted by ascending name)

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";
// Functions
import getContinentsArray from "../../utils/getContinentsArray";
import getCurrenciesArray from "../../utils/getCurrenciesArray";
import getLanguagesArray from "../../utils/getLanguagesArray";

const HomePage = ({
  url,
  setIsoCodes,
  setContinents,
  setCurrencies,
  setLanguages,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = (await axios.get(`${url}/countries`)).data;
        // console.log("home, data: ", data);
        // Get & set ISO codes
        const isoCodes = [];
        for (let i = 0; i < data.length; i++) {
          isoCodes.push([data[i].cca3, data[i].name.common]);
        }
        setIsoCodes(isoCodes);
        // Get & set continents (regions & subregions)
        const continents = [];
        for (let i = 0; i < data.length; i++) {
          continents.push({
            region: data[i].region,
            subregion: data[i].subregion,
          });
        }
        setContinents(getContinentsArray(continents));
        // Get & set currencies
        const currencies = [];
        for (let i = 0; i < data.length; i++) {
          currencies.push({ currencies: data[i].currencies });
        }
        setCurrencies(getCurrenciesArray(currencies));
        // Get & set languages
        const languages = [];
        for (let i = 0; i < data.length; i++) {
          languages.push({ languages: data[i].languages });
        }
        setLanguages(getLanguagesArray(languages));
      } catch (error) {
        console.log("Home page, error: ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Navigate to="/countries/sort?name=asc&page=1" />
  );
};

export default HomePage;
