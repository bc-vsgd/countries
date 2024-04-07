// FUNCTION: returns an array of objects with languages informations: [{abbr: 'afr', lang: 'Afrikaans'}, {abbr: 'sqi', lang: 'Albanian'}, ...]

const getLanguagesArray = (lang) => {
  // 'lang': array of objects, each: {languages: {ell: 'Greek', tur: 'Turkish'}}
  // console.log("get lang arr, arg lang: ", lang);
  const languages = [];
  // 'langAbbr': array used to compare keys (languages abbreviations)
  const langAbbr = [];
  // for each 'cont' element (object)
  for (let i = 0; i < lang.length; i++) {
    // Some countries don't have any language
    if (lang[i].languages !== undefined) {
      for (const [key, value] of Object.entries(lang[i].languages)) {
        // if langauage abbreviation is not in 'langAbbr' array
        if (!langAbbr.includes(key)) {
          // push it in the 'langAbbr' array
          langAbbr.push(key);
          // & push the object {key: value} in 'languages' array
          languages.push({ abbr: key, lang: value });
        }
      }
    }
  }
  // returns an array of objects: [{abbr: 'afr', lang: 'Afrikaans'}, {abbr: 'sqi', lang: 'Albanian'}]
  return languages.sort((a, b) => {
    return a.lang.localeCompare(b.lang);
  });
};

export default getLanguagesArray;
