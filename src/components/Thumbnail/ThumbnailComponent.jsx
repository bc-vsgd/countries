const ThumbnailComponent = ({
  index,
  country,
  name,
  pop,
  area,
  nameSearch,
  cont,
  lang,
  curr,
}) => {
  return (
    <div className="thumbnail">
      <div>{country.name.common}</div>
      <img src={country.flags.svg} className="thumbnail-flag" alt="Flag" />
      {/* If sort by population or area: sort number */}
      {(pop || area) && <p>{index + 1}</p>}
      {/* Sort by population or alphabetical */}
      {(pop || name || nameSearch) && (
        <div>Population: {country.population}</div>
      )}
      {/* Sort by area or alphabetical */}
      {(area || name || nameSearch) && <div>Area: {country.area} km2</div>}
      {/* Sort by continent */}
      {cont && (
        <div>
          <p>Continent: {country.region}</p>
          <p>{country.subregion}</p>
        </div>
      )}
      {/* Sort by language */}
      {lang && (
        <div>
          {Object.values(country.languages).length === 1 ? (
            <p>Language:</p>
          ) : (
            <p>Languages:</p>
          )}
          <div>
            {Object.values(country.languages).map((language, index) => {
              return <p key={index}>{language}</p>;
            })}
          </div>
        </div>
      )}
      {/* Sort by currency */}
      {curr && (
        <div>
          {Object.values(country.currencies).length === 1 ? (
            <p>Currency:</p>
          ) : (
            <p>Currencies:</p>
          )}
          {Object.values(country.currencies).map((currency, index) => {
            return <p key={index}>{currency.name}</p>;
          })}
        </div>
      )}
    </div>
  );
};

export default ThumbnailComponent;
