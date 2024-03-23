const getContinentsArray = (cont) => {
  // cont: array of objects containing each: key region, key subregion
  // console.log(cont);
  const continents = [];
  const regions = [];
  //
  // GET THE REGIONS
  // for each array element (object)
  for (let i = 0; i < cont.length; i++) {
    // if value of key 'region' is not in continents array, push the region in the array
    for (const [key, value] of Object.entries(cont[i])) {
      if (key === "region") {
        if (!regions.includes(value)) {
          regions.push(value);
        }
      }
    }
  }

  //
  // GET THE SUBREGIONS
  // for each 'regions' array element (string)
  for (let i = 0; i < regions.length; i++) {
    // new array: subregions
    const subregions = [];
    // for each 'cont' array element (object)
    for (let j = 0; j < cont.length; j++) {
      // get an array of 2 arrays: [['region', 'africa'],['subregion', 'eastern africa']]
      const objArray = Object.entries(cont[j]);
      // if 2nd element of 1st array === 'regions' array string
      if (objArray[0][1] === regions[i]) {
        // if 2nd element of 2nd array is not in 'subregions' array
        if (!subregions.includes(objArray[1][1])) {
          // push the new subregion name in the 'subregions' array
          subregions.push(objArray[1][1]);
        }
      }
    }
    //
    // CONTINENTS ARRAY:
    continents.push({ region: regions[i] });
    for (let k = 0; k < subregions.length; k++) {
      if (subregions[k] !== "") {
        continents.push({ subregion: subregions[k] });
      }
    }
  }
  // console.log("continents: ", continents);
  return continents;
};

export default getContinentsArray;
