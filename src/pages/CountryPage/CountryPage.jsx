import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// Components
import Loading from "../../components/Loader/Loader";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  if (Number(initialStr) >= 3) {
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
    return str;
  } else {
    // Area < 3 km2
    let str = initialStr;
    return str;
  }
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
    <div className="country-page container flex-col">
      {/* Head div: back button + Country name */}
      <div className="head-div flex-row">
        {/* Back to previous page */}
        <div className="back-btn-div flex-row">
          <button
            className="flex-row"
            onClick={() => {
              if (location.state) {
                navigate(location.state.from);
              } else {
                navigate("/");
              }
            }}
          >
            <FontAwesomeIcon icon="fa-solid fa-angle-left" className="icon" />
          </button>
          {/* <p>Back</p> */}
        </div>
        {/* Name */}
        <div className="flex-col">
          <h1 className="flex-col">
            <p>{data.name.common}</p>
            <p>({data.name.official})</p>
          </h1>
        </div>
      </div>

      {/* If native name */}
      <div className="flex-col">
        {data.name.nativeName && (
          <div className="info-div flex-row">
            <div>
              {languages.length === 1 ? (
                <p>Native name</p>
              ) : (
                <p>Native names</p>
              )}
            </div>
            <div className="flex-col">
              {languages.map((language, index) => {
                return (
                  <div key={index} className="flex-row">
                    <p className="native-name-lang">{language[1]} :</p>
                    <p>{language[2]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Flag */}
      <div className="flag-div flex-col">
        <div>
          <img src={data.flags.svg} alt="flag"></img>
        </div>
        <div>{data.flags.alt}</div>
      </div>
      {/* Capital, population, area, language(s) */}
      <div>
        {data.capital && (
          <div className="info-div flex-row">
            <div>Capital</div>
            <div>{data.capital}</div>
          </div>
        )}
        {/* States: population, area */}

        <div className="info-div flex-row">
          <div>Population</div>
          <div>{population} inhab.</div>
        </div>
        <div className="info-div flex-row">
          <div>Area</div>
          <div>{area} km²</div>
        </div>
        {/* If languages */}
        {data.languages && (
          <div className="info-div flex-row">
            <div>
              {Object.entries(data.languages).length === 1 ? (
                <p>Language</p>
              ) : (
                <p>Languages</p>
              )}
            </div>
            <div className="flex-col">
              {Object.values(data.languages).map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
            </div>
          </div>
        )}
      </div>
      {/* Region, subregion, borders */}
      <div>
        <div className="info-div flex-row">
          <div>Continent</div>
          <div>{data.region}</div>
        </div>

        {data.subregion && (
          <div className="info-div flex-row">
            <div>Subregion</div>
            <div>{data.subregion}</div>
          </div>
        )}
        {/* If landlocked */}
        {data.landlocked && (
          <div className="info-div flex-row">
            <div>Landlocked country</div>
            {/* Empty div for display-flex */}
            <div></div>
          </div>
        )}
        {/* If island */}
        {!data.landlocked && !data.borders && (
          <div className="info-div flex-row">
            <div>Island</div>
            {/* Empty div for display-flex */}
            <div></div>
          </div>
        )}
        {/* If borders */}
        {data.borders && (
          <div className="info-div flex-row">
            {/* State: borders */}
            <div>{borders.length === 1 ? <p>Border</p> : <p>Borders</p>}</div>
            <div className="flex-col">
              {borders.map((border, index) => {
                return <p key={index}>{border}</p>;
              })}
            </div>
          </div>
        )}
      </div>
      {/* If Currencies */}
      {data.currencies && (
        <div>
          <div className="info-div flex-row">
            <div>
              {Object.keys(data.currencies).length === 1 ? (
                <p>Currency</p>
              ) : (
                <p>Currencies</p>
              )}
            </div>
            <div className="flex-col">
              {Object.values(data.currencies).map((currency, index) => {
                return <p key={index}>{currency.name}</p>;
              })}
            </div>
          </div>
        </div>
      )}
      {/* If coat of arms */}
      {data.coatOfArms.svg && (
        <div>
          <div className="info-div arms-div flex-row">
            <div>Coat of arms</div>
            <div>
              <img
                src={data.coatOfArms.svg}
                className="coat-of-arms flex-row"
                alt="Coat of arms"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryPage;
