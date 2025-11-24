import React from "react";
import DNAAnimation from "./DNAAnimation";

const Header: React.FC = () => {
  return (
    <header>
      <div className="top-bar">
        <div className="banner-text">
          <h2>IPSN</h2>
          <p>
            International <br />
            Pathogen <br />
            Surveillance <br />
            Network
          </p>
        </div>

        <div className="dna">
          <DNAAnimation />
        </div>
      </div>

      <nav className="main-nav">
        <div className="nav-text">
          <h3>Community Of Practice</h3>
        </div>
      </nav>
    </header>
  );
};

export default Header;
