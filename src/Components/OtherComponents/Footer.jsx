import React from "react";
import "./Footer.css"; // Assurez-vous de créer et styliser Footer.css si nécessaire

export default function Footer() {
  return (
    <footer className="footer">
      
     
      <div className="social-links">
        {/* Lien LinkedIn */}
        <a
          href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A64682555&keywords=ade%20ensa%20agadir&origin=RICH_QUERY_SUGGESTION&position=1&searchId=c174d826-e75b-443e-a41c-a4074d73c4da&sid=jio&spellCorrectionEnabled=false"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        {/* Lien Instagram */}
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram"></i>
        </a>
        {/* Lien Site Web */}
        <a
          href="http://www.ensa-agadir.ac.ma/"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Site Web"
        >
          <i className="fas fa-globe"></i>
        </a>
        {/* Lien Facebook */}
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
          aria-label="Facebook"
        >
          <i className="fab fa-facebook"></i>
        </a>
      </div>
    </footer>
  );
}
