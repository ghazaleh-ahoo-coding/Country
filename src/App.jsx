import { useState, useEffect } from "react";
import Controls from "./components/Controls";
import CountriesList from "./components/CountriesList";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [hasInteracted, setHasInteracted] = useState(false); // ✅ key fix

  const clearFilters = () => {
    setSearch("");
    setRegion("all");
    setHasInteracted(false); // reset interaction
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      setError(null);

      let url = "https://restcountries.com/v3.1/all";

      if (search.length >= 2) {
        url = `https://restcountries.com/v3.1/name/${search}`;
        setHasInteracted(true);
      } else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${region}`;
        setHasInteracted(true);
      }

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch countries");
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        // ✅ show error ONLY after user interaction
        if (hasInteracted) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [search, region, hasInteracted]);

  return (
    <div className="app">
      <h1>🌍 Countries Explorer</h1>

      <Controls
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
        clearFilters={clearFilters}
      />

      {loading && <p className="status">Loading countries...</p>}

      {!loading && error && (
        <div className="status error">
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && hasInteracted && countries.length === 0 && (
        <p className="status">No results found</p>
      )}

      <CountriesList countries={countries} />
    </div>
  );
}

export default App;
