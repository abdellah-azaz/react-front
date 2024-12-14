import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConsultSd.css";
import Navbar from "../gestionSalles/Navbar";
import Footer from "../OtherComponents/Footer";
import { useParams } from "react-router-dom";

const ConsultSd = () => {
  const {code}=useParams();
  const [reservations, setReservations] = useState([]);
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReservationsAndSalles();
  }, []);

  const fetchReservationsAndSalles = async () => {
    try {
      const reservationsResponse = await axios.get(
        "http://localhost:8080/ProduitEJBdyna/api/reservations/afficherReservations"
      );
      const sallesResponse = await axios.get(
        "http://localhost:8080/ProduitEJBdyna/api/salles/afficher"
      );

      setReservations(reservationsResponse.data);
      setSalles(sallesResponse.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const getSuggestions = (reservationSalle) => {
    // Filtrer les salles disponibles ayant la même catégorie et la même filière
    return salles.filter(
      (salle) =>
        salle.statut === "disponible" &&
        salle.categorie.code === reservationSalle.categorie.code
    );
  };

  const handleReservation = async (filiere_code, user_code, salle_id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/ProduitEJBdyna/api/reservations/addReservation/${filiere_code}/${user_code}/${salle_id}`
      );
      alert(`Réservation effectuée avec succès pour la salle ID ${salle_id}.`);
      fetchReservationsAndSalles(); // Rafraîchir les données
    } catch (err) {
      alert(`Erreur lors de la réservation : ${err.message}`);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="consultsd-container">
      <Navbar code={code}/>
      <h1>Suggestions pour Salles Indisponibles</h1>
      {reservations.map(
        (reservation) =>
          reservation.salle.statut === "indisponible" && (
            <div key={reservation.id} className="reservation-section">
              <h2>
                Réservation ID: {reservation.id} - Salle:{" "}
                {reservation.salle.libelle}
              </h2>
              <p>
                Catégorie: {reservation.salle.categorie.libelle} - Statut:{" "}
                {reservation.salle.statut}
              </p>
              <h3>Suggestions de Salles Disponibles :</h3>
              {getSuggestions(reservation.salle).length > 0 ? (
                <table className="suggestion-table">
                  <thead>
                    <tr>
                      <th>ID Salle</th>
                      <th>Libellé</th>
                      <th>Catégorie</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSuggestions(reservation.salle).map((salle) => (
                      <tr key={salle.id}>
                        <td>{salle.id}</td>
                        <td>{salle.libelle}</td>
                        <td>{salle.categorie.libelle}</td>
                        <td>
                          <button
                            className="reserve-button"
                            onClick={() =>
                              handleReservation(
                                reservation.filiere.code, // filiere_code
                                reservation.user.code, // user_code
                                salle.id // salle_id
                              )
                            }
                          >
                            Demander
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Aucune salle disponible dans la même catégorie.</p>
              )}
            </div>
          )
      )}
      <Footer/>
    </div>
  );
};

export default ConsultSd;
