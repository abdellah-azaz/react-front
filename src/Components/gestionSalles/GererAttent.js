import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./GererAttent.css";
import Navbar from "./Navbar";
import Footer from "../OtherComponents/Footer";

const GererAttent = () => {
  const {code}=useParams();
  const [salles, setSalles] = useState([]);
  const [reservationsBySalle, setReservationsBySalle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSallesAndReservations();
  }, []);

  const fetchSallesAndReservations = async () => {
    try {
      const sallesResponse = await axios.get("http://localhost:8080/ProduitEJBdyna/api/salles/afficher");
      const reservationsResponse = await axios.get("http://localhost:8080/ProduitEJBdyna/api/reservationsatt/afficherReservationatts");

      let sallesData = sallesResponse.data;
      const reservationsData = reservationsResponse.data;

      // Trier les salles par ordre croissant de leurs IDs
      sallesData = sallesData.sort((a, b) => a.id - b.id);

      // Grouper les réservations par salle
      const groupedReservations = reservationsData.reduce((acc, reservation) => {
        const salleId = reservation.salle.id;
        if (!acc[salleId]) {
          acc[salleId] = [];
        }
        acc[salleId].push(reservation);
        return acc;
      }, {});

      setSalles(sallesData);
      setReservationsBySalle(groupedReservations);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteReservation = (reservationId) => {
    axios
      .delete(`http://localhost:8080/ProduitEJBdyna/api/reservationsatt/${reservationId}`)
      .then(() => {
        alert("Réservation supprimée avec succès !");
        fetchSallesAndReservations();
      })
      .catch((err) => {
        alert(`Erreur lors de la suppression: ${err.message}`);
      });
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur: {error}</div>;

  return (
    <div className="reservations-container">
      <Navbar code={code}/>
      <h1>Réservations en attente par Salle</h1>
      {salles.map((salle) => (
        <div key={salle.id} className="salle-section">
          <h2>{`Salle ${salle.id}: ${salle.libelle}`}</h2>
          {reservationsBySalle[salle.id] && reservationsBySalle[salle.id].length > 0 ? (
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>ID Réservation</th>
                  <th>Utilisateur</th>
                  <th>Filière</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservationsBySalle[salle.id].map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.user.nom}</td>
                    <td>{reservation.filiere.libelle}</td>
                    <td>
                      <button
                        className="approve-button"
                        onClick={() => navigate(`/gererNotif1/${reservation.salle.id}/${reservation.id}/${code}`)}
                      >
                        Approuver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Pas de réservation en attente</p>
          )}
        </div>
      ))}
      <Footer/>
    </div>
  );
};

export default GererAttent;
