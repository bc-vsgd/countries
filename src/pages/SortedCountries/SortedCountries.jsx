import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent";
import ThumbnailComponent from "../../components/Thumbnail/ThumbnailComponent";

const SortedCountries = ({ url, isoCodes }) => {
  // console.log("sorted page, iso codes: ", isoCodes);
  // States
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Page title
  const [pageTitle, setPageTitle] = useState(["name", "asc"]);
  // Total number of pages
  const [maxPage, setMaxPage] = useState(1);
  // Query params
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  const [pop, setPop] = useState(searchParams.get("pop") || "");
  const [area, setArea] = useState(searchParams.get("area") || "");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (name) {
          const { data } = await axios.get(
            `${url}/countries/sort?name=${name}&page=${page}`
          );
          // console.log("sorted, data >> ", data);
          setData(data.data);
          setPageTitle(["name", name]);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (pop) {
          const { data } = await axios.get(
            `${url}/countries/sort?pop=${pop}&page=${page}`
          );
          // console.log("sorted, data >> ", data);
          setData(data.data);
          setPageTitle(["pop", pop]);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
        if (area) {
          const { data } = await axios.get(
            `${url}/countries/sort?area=${area}&page=${page}`
          );
          // console.log("sorted, data >> ", data);
          setData(data.data);
          setPageTitle(["area", area]);
          setMaxPage(Math.ceil(data.data.length / 20));
        }
      } catch (error) {
        console.log("sorted page, error >>> ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [name, pop, area, page]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="sorted-page container">
      <SearchComponent
        setPageTitle={setPageTitle}
        setPage={setPage}
        setSearchParams={setSearchParams}
        setName={setName}
        setPop={setPop}
        setArea={setArea}
      />
      {/* Page title (h1) */}
      {(name || pop || area) && (
        <h1>
          <span>
            <span>Countries sorted by </span>
            {name && pageTitle[1] === "asc" && (
              <span> ascending alphabetical order</span>
            )}
            {name && pageTitle[1] === "desc" && (
              <span> descending alphabetical order</span>
            )}
            {pop && pageTitle[1] === "asc" && (
              <span>ascending population order</span>
            )}
            {pop && pageTitle[1] === "desc" && (
              <span>descending population order</span>
            )}
            {area && pageTitle[1] === "asc" && (
              <span>ascending area order</span>
            )}
            {area && pageTitle[1] === "desc" && (
              <span>descending area order</span>
            )}
          </span>
        </h1>
      )}

      <PaginationComponent
        page={page}
        setPage={setPage}
        maxPage={maxPage}
        name={name}
        pop={pop}
        area={area}
        setSearchParams={setSearchParams}
      />

      <div className="sorted-thumbnails flex-row">
        {data.slice((page - 1) * 20, page * 20).map((country, index) => {
          return (
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
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SortedCountries;
