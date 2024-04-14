import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// Pages
import HomePage from "./pages/HomePage/HomePage";
import SortedCountries from "./pages/SortedCountries/SortedCountries";
import CountryPage from "./pages/CountryPage/CountryPage";
// Components
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
// Style
import "./App.css";
// Icons
import { library } from "@fortawesome/fontawesome-svg-core";
// Solid icons
import {
  faHouse,
  faArrowTurnUp,
  faArrowTurnDown,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
// Brand icons
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
library.add(
  faHouse,
  faArrowTurnUp,
  faArrowTurnDown,
  faAngleLeft,
  faAngleRight,
  faLinkedin,
  faGithub
);

// Local server
// const countriesUrl = "http://localhost:3000";
// Remote server
const countriesUrl = "https://site--home--r6xgg7xm7vcz.code.run";

function App() {
  // States
  const [isoCodes, setIsoCodes] = useState([]);
  const [continents, setContinents] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [languages, setLanguages] = useState([]);
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <HomePage
              url={countriesUrl}
              setIsoCodes={setIsoCodes}
              setContinents={setContinents}
              setLanguages={setLanguages}
              setCurrencies={setCurrencies}
            />
          }
        />
        {/* Sorted countries page */}
        <Route
          path="/countries/sort"
          element={
            <SortedCountries
              url={countriesUrl}
              isoCodes={isoCodes}
              continents={continents}
              languages={languages}
              currencies={currencies}
            />
          }
        />
        <Route
          path="/countries/search"
          element={
            <SortedCountries
              url={countriesUrl}
              isoCodes={isoCodes}
              continents={continents}
              languages={languages}
              currencies={currencies}
            />
          }
        />
        {/* One country page */}
        <Route
          path="/country/:name"
          element={
            <CountryPage
              url={countriesUrl}
              isoCodes={isoCodes}
              continents={continents}
              languages={languages}
              currencies={currencies}
            />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
