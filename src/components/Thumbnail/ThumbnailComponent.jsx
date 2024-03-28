const ThumbnailComponent = ({ index, country, page, name, pop, area }) => {
  return (
    <div className="thumbnail">
      <div>{country.name.common}</div>
      <img src={country.flags.svg} className="thumbnail-flag" alt="Flag" />
      {/* If sort by population or area: sort number */}
      {(pop || area) && <p>{(page - 1) * 20 + index + 1}</p>}
      {/* Sort by population or alphabetical */}
      {(pop || name) && <div>Population: {country.population}</div>}
      {/* Sort by area or alphabetical */}
      {(area || name) && <div>Area: {country.area} km2</div>}
    </div>
  );
};

export default ThumbnailComponent;
