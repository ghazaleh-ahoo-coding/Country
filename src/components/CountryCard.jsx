import React from "react";
import "./CountryCard.css";


export default function CountryCard({ country }) {
  return (
    <div className="country-card">
      <img
        src={country.flags?.png}
        alt={country.name?.common}
        className="flag"
      />
      <h3>{country.name?.common || "Unknown"}</h3>
      <p>Region: {country.region || "Unknown"}</p>
      <p>
        Population:{" "}
        {country.population ? country.population.toLocaleString() : "Unknown"}
      </p>
    </div>
  );
}
