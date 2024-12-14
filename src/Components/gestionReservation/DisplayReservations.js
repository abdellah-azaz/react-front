import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../gestionSalles/Navbar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./DisplayReservations.css";
import Footer from "../OtherComponents/Footer";
import UpdateReservation from "./UpdateReservation"; // Assurez-vous que le chemin du composant UpdateReservation est correct

const DisplayReservations = () => {
  const [reservations, setReservations] = useState([]);
  const {nom,code,email}=useParams();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservations();
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios
      .get("http://localhost:8080/ProduitEJBdyna/api/notificationprofs/getnotificationprofs")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des notifications:", err);
      });
  };

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/ProduitEJBdyna/api/reservations/afficherReservations"
      );
      setReservations(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.user.nom.toLowerCase().includes(search)
  );


  const deleteNotification = (id) => {
    axios
      .delete(`http://localhost:8080/ProduitEJBdyna/api/notificationprofs/${id}`)
      .then(() => {
        alert("Notification supprimée avec succès !");
        fetchNotifications(); // Mise à jour de la liste des notifications après suppression
      })
      .catch((err) => {
        alert(`Erreur lors de la suppression ${id}: ${err.message}`);
      });
  };

  const deleteReservation = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/ProduitEJBdyna/api/reservations/${id}`
      );
      alert("Réservation supprimée avec succès !");
      fetchReservations();
    } catch (err) {
      alert(`Erreur lors de la suppression : ${err.message}`);
    }
  };

  return (
    
      
  <div className="grand-container">
     <Navbar code={code}/> 
    <div className="container1">
    <div class="profile-container">
  <i class="fas fa-user-circle profile-icon"></i>
  <div className="texte">
 user: {nom} <br/>
 email: {email}
  </div>
  <h3>{notifications.length} Notifications</h3>
          <div className="notifications">
            <ul>
              {notifications.map((notif, index) => (
                <div key={index}>
                  {index+1}. 
                  <li>
                    {notif.libelle}
                    <button 
                      
                      onClick={() => deleteNotification(notif.id)}
                    >
                    x
                    </button>
                  </li>
                </div>
              ))}
            </ul>
          </div>
</div>
      <button>
       
      </button>
      <button>
       
      </button>
      <button>
      
      </button>
      <button>
       
      </button>
      <button>
        
      </button>
    </div>
      <div className="container">
        <h1>Liste des Réservations</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par nom utilisateur..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <table className="reservation-table">
          <thead>
            <tr>
              <th>ID</th>
             
              <th>Filière</th>
              <th>Salle</th>
              <th>Utilisateur</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.id}</td>
               
                <td>{reservation.filiere.libelle}</td>
                <td>{reservation.salle.libelle}</td>
                <td>{reservation.user.nom}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteReservation(reservation.id)}
                  >
                    Supprimer
                  </button>
                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/updateReservation/${reservation.id}/${code}`)
                    }
                  >
                    liberer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/addReservation/${code}`)
                    }
                  >
                    ajouter
                  </button>

                  <button
                    className="edit-button"
                    onClick={() =>
                      navigate(`/consultsd/${code}`)
                    }
                  >
                    consulter 
                  </button>
      </div>
      <Footer/>
      </div>
     
   
  );
};

export default DisplayReservations;
