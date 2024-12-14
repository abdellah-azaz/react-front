import React, {useState} from "react";

import './homeGstFil.css';
import logoENSA from '../Assets/logo_ensa.jpg';
import Footer from "../OtherComponents/Footer.jsx";
import { loginUser } from "./apis.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Home = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "NA",
  });

  const [error, setError] = useState(null);
  const navigate=useNavigate();

  // Gestion des changements de champs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Réinitialiser l'erreur avant une nouvelle tentative

    const { email, password, role } = data;

    if (role === "NA") {
      setError("Veuillez sélectionner un rôle.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/ProduitEJBdyna/api/users/verifyUser/${email}/${password}/${role}`
      );

      if (response.status === 200) {
        // Succès de la connexion
        alert("Connexion réussie !");
        const user=response.data;
        alert(`User email: ${user.email}\nRole: ${user.role}`);
        if (user.role === '') {
                  
        } else if (user.role === 'responsable salles') {
            navigate(`/displaySalles/${user.nom}/${user.code}/${user.email}`)
        } else if (user.role === 'professeur') {
            navigate(`/displayReservations/${user.nom}/${user.code}/${user.email}`)
        } else if (user.role === 'ADMIN') {
          
        }
    } else {
        const errorMessage = await response.text();
        console.error('Erreur de l\'API:', errorMessage); // Affiche l'erreur dans la console
        setError(errorMessage);
       
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Utilisateur non trouvé ou informations incorrectes.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    }
  };

  return (
    <>
      <div>
        <div className="header">
          <div className="Home">
            <button className="HomeBTN">Home</button>
          </div>
          <div className="imageENSA">
            <img src={logoENSA} className="logoENSA" alt="Logo ENSA" />
          </div>

          <div className="container">
            <form onSubmit={handleSubmit} className="form">
              <label id="label">Email</label>
              <input
                type="text"
                className="email"
                id="input"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                placeholder="Entrez votre Email"
              />
              <label id="label">Password</label>
              <input
                type="password"
                className="password"
                id="input"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                placeholder="Entrer votre Mot de passe"
              />
              <label id="label">Role</label>
              <select
                className="role"
                id="select"
                name="role"
                value={data.role}
                onChange={handleChange}
                required
              >
                <option value="NA" disabled>
                  Choisissez votre Role :
                </option>
                <option value="CoordFil">Coordinateur de Filière</option>
                <option value="Responsable salles">Responsable des Salles</option>
                <option value="Professeur">Professeur</option>
                <option value="ADMIN">ADMIN</option>
              </select>
              {error && <div style={{ color: "red" }}>{error}</div>}
              <input type="submit" className="SubmitBTN" value="Se connecter" />
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;









    

