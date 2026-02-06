import { useEffect, useState } from "react";
import Controls from "./components/Controls";
import CountriesList from "./components/CountriesList";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const clearFilters = () => {
    setSearch("");
    setRegion("all");
    setError(null);
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);

      let url = "https://restcountries.com/v3.1/all";

      
      if (search.length >= 2) {
        url = `https://restcountries.com/v3.1/name/${search}`;
      }
      
      else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${region}`;
      }

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Failed to fetch countries");
        }

        const data = await res.json();
        setCountries(data);
        setError(null); 
      } catch (err) {

        if (search.length >= 2 || region !== "all") {
          setError(err.message);
          setCountries([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [search, region]);

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

      {error && (
        <div className="status error">
          <p>Error: {error}</p>
          <button onClick={clearFilters}>Retry</button>
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
        <p className="status">No results found</p>
      )}

      <CountriesList countries={countries} />
    </div>
  );
}

export default App;
