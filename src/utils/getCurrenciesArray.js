// UNFORTUNATELY UNUSED

const getCurrenciesArray = (curr) => {
  //   arg: 'curr': array containing objects: {currencies: {CKD: {name: "Cook Islands dollar", symbol: "..."}} {NZD: {name: "...", symbol: "..."}}}

  //   'currencies': array to be returned, containing objects: {abbr: "...", name: "...", symbol: "..."}
  const currencies = [];
  //   'currAbbr': array of currencies abbreviations: temporary array to check if the currency has already been pushed in 'currencies' array
  const currAbbr = [];
  // For each object of 'curr' array
  for (let i = 0; i < curr.length; i++) {
    // For each key (= currency abbreviation) of 'currencies' key
    for (const [key, value] of Object.entries(curr[i].currencies)) {
      //   if key is not in 'currAbbr' array
      if (!currAbbr.includes(key)) {
        const currency = {};
        // push it in the array
        currAbbr.push(key);
        // & create a 'abbr' key in 'currency' object
        currency.abbr = key;
        // & create 'name' and 'symbol' keys in 'currency' object
        for (const [subKey, subValue] of Object.entries(value)) {
          currency[subKey] = subValue;
        }
        // Push 'currency' object in 'currencies' array
        currencies.push(currency);
      }
    }
  }
  //   console.log("currencies: ", currencies);
  //   Return 'currencies' array, sorted by name
  return currencies.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

export default getCurrenciesArray;
