// THUMBNAIL COMPONENT
// Displays a country thumbnail with name & flag and:
// - if sorted by population or area: pop or area number
// - if sorted by name, name search, continent, language or currency: pop & area numbers

// FUNCTION

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

// COMPONENT

const ThumbnailComponent = ({
  index,
  country,
  page,
  name,
  pop,
  area,
  nameSearch,
  continent,
  language,
  currency,
}) => {
  return (
    <div className="thumbnail flex-col">
      <h2>{country.name.common}</h2>
      <img src={country.flags.svg} className="thumbnail-flag" alt="Flag" />
      {/* Population or area sort */}
      {(pop || area) && (
        <div className="flex-col">
          <p className="flex-row">
            <span>{(page - 1) * 20 + index + 1}.</span>
            {/* Population sort */}
            {pop && (
              <>
                <span>
                  Pop : {strWithSpaces(country.population.toString())}
                </span>
                <span>inhab.</span>
              </>
            )}
            {/* Area sort */}
            {area && (
              <>
                <span>Area : {strWithSpaces(country.area.toString())}</span>
                <span>km²</span>
              </>
            )}
          </p>
        </div>
      )}
      {/* Name sort */}
      {(name || nameSearch || continent || language || currency) && (
        <div className="flex-col">
          <p className="flex-row">
            <span>
              Population : {strWithSpaces(country.population.toString())}
            </span>
            <span>inhab.</span>
          </p>
          <p className="flex-row">
            <span>Area : {strWithSpaces(country.area.toString())}</span>
            <span>km²</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ThumbnailComponent;
