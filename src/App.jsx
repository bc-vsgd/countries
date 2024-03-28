import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <Router>
      <Header />
      <Routes>
        {/* Home --> Sorted countries page */}
        <Route path="/" element={<HomePage />} />
        {/* Sorted countries page */}
        <Route
          path="/countries/sort"
          element={<SortedCountries url={countriesUrl} />}
        />
        {/* One country page */}
        <Route
          path="/country/:name"
          element={<CountryPage url={countriesUrl} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
