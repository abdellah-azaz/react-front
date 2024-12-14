import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./EditSalle.css";
import Navbar from "./Navbar";
import Footer from "../OtherComponents/Footer";

const EditSalle = () => {
  const { id,code } = useParams();
  const navigate = useNavigate();
  const [salle, setSalle] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSalle(id);
  }, [id]);

  const fetchSalle = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/ProduitEJBdyna/api/salles/${id}`);
      setSalle(response.data);
    } catch (err) {
      console.error("Erreur lors de la récupération de salle:", err);
      setMessage("Erreur lors de la récupération des données.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSalle((prevSalle) => ({ ...prevSalle, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/ProduitEJBdyna/api/salles/modifierSalle/${salle.id}/${salle.categorie.code}/${salle.statut}/${salle.libelle}/${salle.nbr_places}`
      );
      alert("Salle modifiée avec succès !");
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la modification :", err);
      setMessage(`Erreur lors de la modification : ${err.message}`);
    }
  };

  if (!salle) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="edit-container">
      <Navbar code={code}/>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Libellé</label>
          <input
            type="text"
            name="libelle"
            
            value={salle.libelle}
            readOnly
           
          />
        </div>
        <div className="form-group">
          <label>Statut</label>
          <input
            type="text"
            name="statut"
            placeholder="Disponible/Pas disponible"
            value={salle.statut || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de places</label>
          <input
            type="number"
            name="nbr_places"
            placeholder="Entrer le nombre de places"
            value={salle.nbr_places || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Code Catégorie</label>
          <input
            type="text"
            name="categorie_code"
            placeholder="Entrer le code de la catégorie"
            value={salle.categorie?.code || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Valider</button>
      </form>
      {message && <p className="error-message">{message}</p>}
      <Footer/>
    </div>
  );
};

export default EditSalle;
