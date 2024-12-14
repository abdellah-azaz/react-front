import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import "./GererNotif.css";
import Footer from '../OtherComponents/Footer';

const GererNotif1 = () => {
  const { id,code,codeu } = useParams();
  const [salle, setSalle] = useState(null);
  const [reserv, setReserv] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSalle(id);
    fetchReserv(code);
  }, [id,code]);

  const fetchSalle = (id) => {
    axios
      .get(`http://localhost:8080/ProduitEJBdyna/api/salles/${id}`)
      .then((response) => {
        setSalle(response.data);
      })
       
      .catch((err) => {
        console.error("Erreur lors de la récupération de salle:", err);
        setMessage('Erreur lors de la récupération des données.');
      });
    };


    const fetchReserv = (code) => {
       
            axios
            .get(`http://localhost:8080/ProduitEJBdyna/api/reservationsatt/${code}`)
            .then((response) => {
              setReserv(response.data);
        
          })
          .catch((err) => {
            console.error("Erreur lors de la récupération de reserv:", err);
            setMessage('Erreur lors de la récupération des données.');
          });
        };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalle({ ...salle, [name]: value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // Envoie la requête PUT avec les données modifiées
    axios
      .post(`http://localhost:8080/ProduitEJBdyna/api/salles/traiter/${reserv.user.nom}/${salle.id}/${salle.categorie.code}/${salle.statut}/${salle.libelle}/${salle.nbr_places}`)
      .then((response) => {
        setMessage('Salle modifiée avec succès!');
      })
      .catch((error) => {
        setMessage('Erreur lors de la modification de la salle.');
      });
  };

  if (!salle) {
    return <p>Chargement des données...</p>;
  }
  if (!reserv) {
    return <p>Chargement des données...</p>;
  }

  return (
    <div className="add-salle-container">
      <Navbar code={codeu}/>
      <h2>traiter la demande de user : {reserv.user.nom}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID</label>
          <input
            type="number"
            name="id"
            value={salle.id}
            readOnly // L'identifiant ne doit pas être modifiable
          />
        </div>
     
        <div className="form-group">
          <label>Catégorie</label>
          <input
            type="text"
            name="categorie"
            value={salle.categorie?.libelle || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Statut</label>
          <input
            type="text"
            name="statut"
            value={salle.statut || ''}
            placeholder="disponible/pas disponible"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Libellé</label>
          <input
            type="text"
            name="libelle"
            value={salle.libelle || ''}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Nombre de places</label>
          <input
            type="number"
            name="nbr_places"
            value={salle.nbr_places || ''}
            readOnly
          />
        </div>
        <button type="submit">reserver</button>
      
      </form>
    <Footer/>
    </div>
  );
};

export default GererNotif1;
