import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";

const CountryPage = ({ url }) => {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/country/${name}`);
        // console.log("country comp, data: ", data.data[0]);
        setData(data.data[0]);
      } catch (error) {
        console.log("Country comp, error: ", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {/* Back to previous page */}
      <div>
        <button
          onClick={() => {
            if (location.state) {
              navigate(location.state.from);
            } else {
              navigate("/");
            }
          }}
        >
          Back
        </button>
      </div>
      {/* Name */}
      <div>
        <h1>
          <p>{data.name.common}</p>
          <p>({data.name.official})</p>
        </h1>
        {/* if native name */}
        {data.name.nativeName && (
          <div>
            {Object.keys(data.name.nativeName).length === 1 ? (
              <p>Native name:</p>
            ) : (
              <p>Native names:</p>
            )}
            {Object.entries(data.name.nativeName).map((nativeName, index) => {
              return (
                <div key={index}>
                  <p>
                    {nativeName[0]}: {nativeName[1].official}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* Flag */}
      <div>
        <img src={data.flags.svg} className="country-flag" alt="flag"></img>
        <p>{data.flags.alt}</p>
      </div>
      {/* Capital, population, area, language(s) */}
      <div>
        {data.capital && <p>Capital: {data.capital}</p>}
        <p>Population: {data.population} inhab.</p>
        <p>Area: {data.area} km2</p>
        {/* If languages */}
        {data.languages && (
          <div>
            {Object.entries(data.languages).length === 1 ? (
              <p>Language:</p>
            ) : (
              <p>Languages:</p>
            )}
            {Object.values(data.languages).map((value, index) => {
              return <p key={index}>{value}</p>;
            })}
          </div>
        )}
      </div>
      {/* Region, subregion, borders */}
      <div>
        <p>Continent: {data.region}</p>
        {data.subregion && <p>Subregion: {data.subregion}</p>}
        {/* If landlocked */}
        {data.landlocked && <p>Landlocked</p>}
        {/* If island */}
        {!data.landlocked && !data.borders && <p>Island</p>}
        {/* If borders */}
        {data.borders && (
          <div>
            {data.borders.length === 1 ? <p>Border:</p> : <p>Borders:</p>}
            {data.borders.map((border, index) => {
              return <p key={index}>{border}</p>;
            })}
          </div>
        )}
      </div>
      {/* If Currencies */}
      {data.currencies && (
        <div>
          {Object.keys(data.currencies).length === 1 ? (
            <p>Currency:</p>
          ) : (
            <p>Currencies:</p>
          )}
          {Object.values(data.currencies).map((currency, index) => {
            return <p key={index}>{currency.name}</p>;
          })}
        </div>
      )}
      {/* If coat of arms */}
      {data.coatOfArms && (
        <div>
          <p>Coat of arms:</p>

          <img
            src={data.coatOfArms.svg}
            className="coat-of-arms"
            alt="Coat of arms"
          />
        </div>
      )}
    </div>
  );
};

export default CountryPage;
