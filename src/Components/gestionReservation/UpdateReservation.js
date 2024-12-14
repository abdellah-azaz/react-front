import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router,Route, useParams, useNavigate } from "react-router-dom";
import "./UpdateReservation.css";
import DisplayReservations from "./DisplayReservations";
import Navbar from "../gestionSalles/Navbar";
import Footer from "../OtherComponents/Footer";
const UpdateReservation = () => {
  const { id,code } = useParams(); // Récupération de l'ID depuis l'URL
  const [reservation, setReservation] = useState(null); // État de la réservation
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur
  const navigate = useNavigate(); // Pour naviguer entre les pages

  useEffect(() => {
    fetchReservation();
  }, []);

  const fetchReservation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/ProduitEJBdyna/api/reservations/${id}`
      );
      setReservation(response.data); // Mise à jour de la réservation
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/ProduitEJBdyna/api/reservations/modifierReservation/${id}/${reservation.filiere.code}/${reservation.user.code}/${reservation.salle.id}`
      );
      alert("Réservation mise à jour avec succès !");
      // Redirection vers la page principale
    } catch (err) {
      alert(`Erreur lors de la mise à jour : ${err.message}`);
    }
  };

  const handleChange = (field, value) => {
    setReservation({ ...reservation, [field]: { ...reservation[field], code: value } });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (

      <div className="update-reservation">
        <Navbar code={code}/>
        <h1>liberer la Réservation {reservation.id}</h1>
        <form onSubmit={handleSubmit}>
         
          <div className="form-group">
            <label htmlFor="filiere">Filière</label>
            <input
              type="number"
              id="filiere"
              value={reservation.filiere.code || ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="salle">Salle</label>
            <input
              type="number"
              id="salle"
              value={reservation.salle.id || ""}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="user">Utilisateur</label>
            <input
              type="number"
              id="user"
              value={code}
              readOnly
             
            />
          </div>
          <button type="submit" className="btn btn-primary">
            liberer
          </button>
        </form>
        <Footer/>
      </div>
    
  );
};

export default UpdateReservation;
