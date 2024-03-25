import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ThumbnailComponent from "../../components/Thumbnail/ThumbnailComponent";

const SortedCountries = ({ url, continents, languages, currencies }) => {
  // States
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Current page, total number of pages
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  // Query params
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const [pop, setPop] = useState(searchParams.get("pop") || "");
  const [area, setArea] = useState(searchParams.get("area") || "");
  const [nameSearch, setNameSearch] = useState(
    searchParams.get("namesearch") || ""
  );
  const [cont, setCont] = useState(searchParams.get("continent") || "");
  const [lang, setLang] = useState(searchParams.get("lang") || "");
  const [curr, setCurr] = useState(searchParams.get("curr") || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${url}/countries/sort?name=${name}&pop=${pop}&area=${area}&namesearch=${nameSearch}&cont=${cont}&lang=${lang}&curr=${curr}`
        );
        // console.log("sorted, data >> ", data);
        setData(data.data);
        // Number of pages
        setMaxPage(Math.ceil(data.data.length / 20));
      } catch (error) {
        console.log("sorted page, error >>> ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [name, pop, area, nameSearch, cont, lang, curr]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <SearchComponent
        setPage={setPage}
        setSearchParams={setSearchParams}
        setName={setName}
        setPop={setPop}
        setArea={setArea}
        setNameSearch={setNameSearch}
        setCont={setCont}
        setLang={setLang}
        setCurr={setCurr}
        continents={continents}
        languages={languages}
        currencies={currencies}
      />
      <PaginationComponent page={page} setPage={setPage} maxPage={maxPage} />

      <div>
        {data.slice((page - 1) * 20, page * 20).map((country, index) => {
          return (
            <Link to={`/country/${country.name.common}`} key={index}>
              <ThumbnailComponent
                // key={index}
                index={index}
                country={country}
                name={name}
                pop={pop}
                area={area}
                nameSearch={nameSearch}
                cont={cont}
                lang={lang}
                curr={curr}
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SortedCountries;
