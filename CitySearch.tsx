import React, { useState } from "react";

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

export default function CitySearch() {
  const [search, setSearch] = useState("");

  const handleChange = (e) => setSearch(e.target.value);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(search.toLowerCase())
  );

  const highlightMatch = (city) => {
    if (!search) return city;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = city.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  return (
    <div style={{ width: "400px", margin: "0 auto" }}>
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search cities..."
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <ul>
        {filteredCities.map((city, idx) => (
          <li key={idx}>{highlightMatch(city)}</li>
        ))}
      </ul>
    </div>
  );
}
