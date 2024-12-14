import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../gestionSalles/Navbar";
import Footer from "../OtherComponents/Footer";
import "./Profile.css"; // Ajoutez un fichier CSS pour styliser ce composant

const Profile = () => {
  const { code } = useParams(); // Récupérer le paramètre 'code' depuis l'URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/ProduitEJBdyna/api/users/getUserById/${code}`
      );
      setUser(response.data); // Stocker les données utilisateur
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement des données utilisateur...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="profile-container">
      <Navbar code={code} /> {/* Passer le code à la barre de navigation si nécessaire */}
      <div className="profile-content">
        <h1>Profil Utilisateur</h1>
        {user ? (
          <div className="user-details">
            <p><strong>Nom:</strong> {user.nom}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>prenom:</strong> {user.prenom}</p>
            <p><strong>Rôle:</strong> {user.role}</p>
            <p><strong>telephon:</strong> {user.telephon}</p>
            <p><strong>statut:</strong> {user.statut}</p>
          </div>
        ) : (
          <p>Aucune donnée utilisateur trouvée pour le code {code}.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
