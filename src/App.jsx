import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
// Pages
import HomePage from "./pages/HomePage/HomePage";
import SortedCountries from "./pages/SortedCountries/SortedCountries";
import CountryPage from "./pages/CountryPage/CountryPage";
// Components
import Header from "./components/Header/Header";
// Style
import "./App.css";

const countriesUrl = "http://localhost:3000";

function App() {
  const [isoCodes, setIsoCodes] = useState([]);
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home --> Sorted countries page */}
        <Route
          path="/"
          element={<HomePage url={countriesUrl} setIsoCodes={setIsoCodes} />}
        />
        {/* Sorted countries page */}
        <Route
          path="/countries/sort"
          element={<SortedCountries url={countriesUrl} isoCodes={isoCodes} />}
        />
        {/* One country page */}
        <Route
          path="/country/:name"
          element={<CountryPage url={countriesUrl} isoCodes={isoCodes} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
