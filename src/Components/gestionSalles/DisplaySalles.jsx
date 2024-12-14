import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import './DisplaySalles.css';
import Navbar from "./Navbar";
import Footer from "../OtherComponents/Footer";

const DisplaySalles = () => {
  const [salles, setSalles] = useState([]);
  const [filteredSalles, setFilteredSalles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const{nom,code,email}=useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalles();
    fetchNotifications();
  }, []);

  const fetchSalles = () => {
    axios
      .get("http://localhost:8080/ProduitEJBdyna/api/salles/afficher")
      .then((response) => {
        setSalles(response.data);
        setFilteredSalles(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchNotifications = () => {
    axios
      .get("http://localhost:8080/ProduitEJBdyna/api/notifications/getnotifications")
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des notifications:", err);
      });
  };

  const deleteSalle = (id) => {
    axios
      .delete(`http://localhost:8080/ProduitEJBdyna/api/salles/${id}`)
      .then(() => {
        alert("Salle supprimée avec succès !");
        fetchSalles();
      })
      .catch((err) => {
        alert(`Erreur lors de la suppression : ${err.message}`);
      });
  };

  const deleteNotification = (id) => {
    axios
      .delete(`http://localhost:8080/ProduitEJBdyna/api/notifications/${id}`)
      .then(() => {
        alert("Notification supprimée avec succès !");
        fetchNotifications(); // Mise à jour de la liste des notifications après suppression
      })
      .catch((err) => {
        alert(`Erreur lors de la suppression ${id}: ${err.message}`);
      });
  };

 

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);
    const filtered = salles.filter((salle) =>
      salle.libelle.toLowerCase().includes(query)
    );
    setFilteredSalles(filtered);
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="grand-container">
      <Navbar code={code}/>
      <div className="container1">
        <div className="profile-container">
          <i className="fas fa-user-circle profile-icon"></i>
          <div className="texte">
          user: {nom}<br/>
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
                    <button 
                      
                      onClick={() => navigate(`/gererNotif/${notif.reservation.salle.id}/${notif.reservation.id}/${code}`)}
                    >
                    T
                    </button>
                    
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
       
      </div>
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher par libellé..."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <table className="salle-table">
          <thead>
            <tr>
              <th>Actions</th>
              <th>ID</th>
              <th>Libellé</th>
              <th>Statut</th>
              <th>Nombre de Places</th>
              <th>Catégorie</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredSalles.map((salle) => (
              <tr key={salle.id}>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteSalle(salle.id)}
                  >
                    Supprimer
                  </button>
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/editSalle/${salle.id}/${code}`)}
                  >
                    Modifier
                  </button>
                </td>
                <td>{salle.id}</td>
                <td>{salle.libelle}</td>
                <td>{salle.statut}</td>
                <td>{salle.nbr_places}</td>
                <td>{salle.categorie?.libelle || "N/A"}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate(`/AddSalle/${code}`)}>Ajouter</button>
        <button onClick={() => navigate(`/gererAttent/${code}`)}>ma liste d'attente</button>
      </div>
      <Footer/>
    </div>
  );
};

export default DisplaySalles;
