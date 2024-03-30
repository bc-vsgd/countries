import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";

// Returns an array: ["deu", "German", "Bundesrepublik Deutschland"]
const languagesArray = (lang, name) => {
  const languages = Object.entries(lang);
  const nativeName = Object.entries(name);
  for (let i = 0; i < languages.length; i++) {
    for (let j = 0; j < nativeName.length; j++) {
      if (languages[i][0] === nativeName[j][0]) {
        languages[i].push(nativeName[j][1].official);
      }
    }
  }
  return languages;
};

// Population, area: add spaces between groups of 3 numbers
const strWithSpaces = (initialStr) => {
  // Reverse string
  let reversedStr = "";
  const length = initialStr.length;
  for (let i = length - 1; i >= 0; i--) {
    reversedStr += initialStr[i];
  }
  // Add spaces
  let spaceStr = "";
  for (let i = 0; i < reversedStr.length; i++) {
    if (i % 3 === 0) {
      spaceStr += " ";
    }
    spaceStr += reversedStr[i];
  }
  // Reverse again string
  let str = "";
  for (let i = spaceStr.length - 1; i >= 0; i--) {
    str += spaceStr[i];
  }
  str = str.trimEnd();
  // console.log("str: ", str);
  return str;
};

// Returns an array of arrays: iso-3 codes & countries: [["FRA", "France"]["...", "..."]]
const bordersArray = (borders, isoCodes) => {
  const bordersArray = [];
  for (let i = 0; i < borders.length; i++) {
    for (let j = 0; j < isoCodes.length; j++) {
      if (borders[i] === isoCodes[j][0]) {
        bordersArray.push(isoCodes[j][1]);
      }
    }
  }
  return bordersArray;
};

const CountryPage = ({ url, isoCodes }) => {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [population, setPopulation] = useState("");
  const [area, setArea] = useState("");
  const [borders, setBorders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/country/${name}`);
        // console.log("country comp, data: ", data.data[0]);
        setData(data.data[0]);
        // Languages & native names
        if (data.data[0].languages) {
          const languages = languagesArray(
            data.data[0].languages,
            data.data[0].name.nativeName
          );
          setLanguages(languages);
        }
        // Population
        if (data.data[0].population) {
          const population = strWithSpaces(data.data[0].population.toString());
          setPopulation(population);
        }
        // Area
        if (data.data[0].area) {
          const area = strWithSpaces(data.data[0].area.toString());
          setArea(area);
        }
        // Borders
        if (data.data[0].borders) {
          const borders = bordersArray(data.data[0].borders, isoCodes);
          setBorders(borders);
        }
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
        {/* If native name */}
        {data.name.nativeName && (
          <div>
            {languages.length === 1 ? (
              <p>Native name:</p>
            ) : (
              <p>Native names:</p>
            )}
            <div>
              {languages.map((language, index) => {
                return (
                  <p key={index}>
                    {language[1]}: {language[2]}
                  </p>
                );
              })}
            </div>
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
        {/* States: population, area */}

        <p>Population: {population} inhab.</p>
        <p>Area: {area} km2</p>
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
            {/* State: borders */}
            {borders.length === 1 ? <p>Border:</p> : <p>Borders:</p>}
            {borders.map((border, index) => {
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
