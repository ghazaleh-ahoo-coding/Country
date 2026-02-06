import React from "react";
import CountryCard from "./CountryCard";


export default function CountriesList({ countries }) {
  return (
    <div className="countries-list">
      {countries.map((country) => (
        <CountryCard country={country} key={country.cca3} />
      ))}
    </div>
  );
}
