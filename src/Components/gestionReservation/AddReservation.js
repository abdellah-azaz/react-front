import React, { useState } from 'react';
import axios from 'axios';
import './AddReservation.css'; // Ajoutez votre style personnalisé ici
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../gestionSalles/Navbar';
import Footer from '../OtherComponents/Footer';

const AddReservation = () => {
  const [filiereCode, setFiliereCode] = useState('');
  const {code}=useParams();
  
  const [userCode, setUserCode] = useState('');
  const [salleCode, setSalleCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (code) {
      setUserCode(code); // Définit userCode avec la valeur de code
    }
  }, [code]);

  const handleSubmit = (e) => {
    e.preventDefault();
    

    // URL de l'API
    const url = `http://localhost:8080/ProduitEJBdyna/api/reservations/addReservation/${filiereCode}/${userCode}/${salleCode}`;

    // Envoi de la requête POST
    axios
      .post(url)
      .then((response) => {
        setMessage('Réservation créée avec succès!');
      })
      .catch((error) => {
        setMessage('Erreur lors de la création de la réservation.');
      });
  };

  return (
    <div className="add-reservation-container">
      <Navbar code={code}/>
      <h2>Ajouter une Réservation</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Code Filière:</label>
          <input
            type="number"
            value={filiereCode}
            placeholder="Entrez le code de la filière"
            onChange={(e) => setFiliereCode(e.target.value)}
            required
          />
        </div>
       
        <div className="form-group">
          <label>Code Utilisateur:</label>
          <input
            type="number"
            value={code}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Code Salle:</label>
          <input
            type="number"
            value={salleCode}
            placeholder="Entrez le code de la salle"
            onChange={(e) => setSalleCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Créer Réservation</button>
      </form>
      {message && <p>{message}</p>}
      <Footer/>
    </div>
  );
};

export default AddReservation;
