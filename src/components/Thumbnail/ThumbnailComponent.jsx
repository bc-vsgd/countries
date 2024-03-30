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

const ThumbnailComponent = ({ index, country, page, name, pop, area }) => {
  return (
    <div className="thumbnail">
      <div>{country.name.common}</div>
      <img src={country.flags.svg} className="thumbnail-flag" alt="Flag" />
      {/* If sort by population or area: sort number */}
      {(pop || area) && <p>{(page - 1) * 20 + index + 1}</p>}
      {/* Sort by population or alphabetical */}
      {(pop || name) && (
        <div>Population: {strWithSpaces(country.population.toString())}</div>
      )}
      {/* Sort by area or alphabetical */}
      {(area || name) && (
        <div>Area: {strWithSpaces(country.area.toString())} km2</div>
      )}
    </div>
  );
};

export default ThumbnailComponent;
