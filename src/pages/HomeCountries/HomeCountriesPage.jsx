import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
// Utils
import getContinentsArray from "../../utils/getContinentsArray";
import getLanguagesArray from "../../utils/getLanguagesArray";
import getCurrenciesArray from "../../utils/getCurrenciesArray";

const HomeCountriesPage = ({
  url,
  setContinents,
  setLanguages,
  setCurrencies,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/countries`);
        // console.log("continents >", data.continents);
        // console.log("languages >", data.languages);
        // console.log("currencies >", data.currencies);
        const continents = getContinentsArray(data.continents);
        setContinents(continents);
        const languages = getLanguagesArray(data.languages);
        setLanguages(languages);
        const currencies = getCurrenciesArray(data.currencies);
        setCurrencies(currencies);
      } catch (error) {
        console.log("home countries page, error >>> ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  });

  return !isLoading && <Navigate to="/countries/sort?name=asc" />;
};

export default HomeCountriesPage;
