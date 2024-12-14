const apiUrl = 'http://localhost:8080/ProduitEJBdyna/api/salles/login';

export const loginUser = async (email, password, role) => {
    
    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            password,
            role
        })
    });
    console.log('Réponse du serveur:', response); // Log de la réponse pour déboguer
    return response;
};


