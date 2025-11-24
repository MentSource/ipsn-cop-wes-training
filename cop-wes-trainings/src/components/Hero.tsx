import React, { useState } from "react";

const Hero: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <section className="hero">
      <h2>Wastewater and Environmental Surveillance Trainings</h2>
      <div className="top-right">
        <input
          type="search"
          placeholder="Search for a course"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button id="mobile-menu" className="hamburger">
          ☰
        </button>
      </div>
    </section>
  );
};

export default Hero;
