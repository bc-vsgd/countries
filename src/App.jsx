import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Pages
import HomePage from "./pages/HomePage/HomePage";
import HomeCountriesPage from "./pages/HomeCountries/HomeCountriesPage";
import SortedCountries from "./pages/SortedCountries/SortedCountries";
// Components
import Header from "./components/Header/Header";
import CountryComponent from "./components/CountryComponent/CountryComponent";
// Style
import "./App.css";

const countriesUrl = "http://localhost:3000";

function App() {
  // Regions & subregions array, languages array: for search component
  const [continents, setContinents] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home --> Home countries page */}
        <Route path="/" element={<HomePage />} />
        {/*  */}
        {/* Countries: get continents [] & --> countries/sort page */}
        <Route
          path="/countries"
          element={
            <HomeCountriesPage
              url={countriesUrl}
              setContinents={setContinents}
              setLanguages={setLanguages}
              setCurrencies={setCurrencies}
            />
          }
        />
        <Route
          path="/countries/sort"
          element={
            <SortedCountries
              url={countriesUrl}
              continents={continents}
              languages={languages}
              currencies={currencies}
            />
          }
        />
        <Route
          path="/country/:name"
          element={<CountryComponent url={countriesUrl} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
