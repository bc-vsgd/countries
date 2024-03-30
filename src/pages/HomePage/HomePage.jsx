// Home page: automatically navigates to Sorted Countries Page (sorted by ascending name)
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";

const HomePage = ({ url, setIsoCodes }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = (await axios.get(`${url}/countries`)).data;
        // console.log("home, data: ", data);
        const isoCodes = [];
        for (let i = 0; i < data.length; i++) {
          isoCodes.push([data[i].cca3, data[i].name.common]);
        }
        setIsoCodes(isoCodes);
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
