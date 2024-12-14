import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";


const Navbar = ({code}) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-icons">
        <li onClick={() => handleNavigation("/")} className="icon-link">
          <i className="fas fa-home"></i>
          <span> login</span>
        </li>
        <li
  onClick={() =>
    (window.location.href =
      "https://fr.wikipedia.org/wiki/%C3%89cole_nationale_des_sciences_appliqu%C3%A9es_d'Agadir")
  }
  className="icon-link"
>
  <i className="fas fa-info-circle"></i> {/* Icône à propos */}
  <span>À propos</span>
</li>

<li
  onClick={() =>
    (window.location.href =
      "https://www.google.com/maps/place/ENSA+Agadir+-+Ecole+Nationale+des+Sciences+Appliqu%C3%A9es/@30.4065725,-9.5307212,16z/data=!4m6!3m5!1s0xdb3c833a697c883:0xd499cff904412ef6!8m2!3d30.4059045!4d-9.5297556!16s%2Fm%2F0m0h_y8?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D")
  }
  className="icon-link"
>
  <i className="fas fa-map-marker-alt"></i> {/* Icône localisation */}
  <span>Localisation</span>
</li>

       
        <li onClick={() => navigate(`/profile/${code}`)} className="icon-link">
          <i className="fas fa-user"></i>
          <span> Profil</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
