import axios from 'axios';

// Configuration de base pour Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/ProduitEJBdyna', // Assurez-vous que cette URL correspond à votre API backend
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
