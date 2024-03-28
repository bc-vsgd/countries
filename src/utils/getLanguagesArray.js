// UNFORTUNATELY UNUSED

const getLanguagesArray = (lang) => {
  const languages = [];
  // 'lang': array of objects, each: {languages: {ell: 'Greek', tur: 'Turkish'}}
  // 'langAbbr': array used to compare keys (languages abbreviations)
  const langAbbr = [];
  // for each 'cont' element (object)
  for (let i = 0; i < lang.length; i++) {
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
  return languages.sort((a, b) => {
    return a.lang.localeCompare(b.lang);
  });
};

export default getLanguagesArray;
