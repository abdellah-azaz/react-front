import React from 'react';
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import Home from './Components/Logins/Home';
import UpdateReservation from './Components/gestionReservation/UpdateReservation';
import AddSalle from './Components/gestionSalles/AddSalle';
import DisplaySalles from './Components/gestionSalles/DisplaySalles';
import EditSalle from './Components/gestionSalles/EditSalle';
import AddReservation from './Components/gestionReservation/AddReservation';
import GererNotif from './Components/gestionSalles/GererNotif';
import GererNotif1 from './Components/gestionSalles/GererNotif1';
import ConsultSd from './Components/gestionReservation/ConsultSd';
import GererAttent from './Components/gestionSalles/GererAttent';
import Profile from './Components/Profile/Profile';
import DisplayReservations from './Components/gestionReservation/DisplayReservations';


function App() {
    return (
     
    // <Router>
    // <Routes>
      // {/* Route principale pour afficher la liste des réservations */}
      // <Route path="/" element={<DisplayReservations />} />

      // {/* Route pour modifier une réservation spécifique */}
       //<Route path="/editSalle/:id" element={<EditSalle />} />
       //<Route path="/AddSalle" element={<AddSalle/>}/>
       //<Route path="/displaySalles" element={<DisplaySalles/>}/>
      // <Route path="/editReservation/:id" element={<UpdateReservation />} />
      // <Route path="/addReservation" element={<AddReservation/>}/>
     //</Routes>
   //il faut ajouter user qui a reserver salle mainant c est ca reserver et un buttob pour rediriger vers la liste d attente
  
   <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/displaySalles/:nom/:code/:email" element={<DisplaySalles/>}/>
    <Route path="/addReservation/:code" element={<AddReservation/>}/>
    <Route path="/displayReservations/:nom/:code/:email" element={<DisplayReservations />} />
    <Route path="/updateReservation/:id/:code" element={<UpdateReservation />} />
    <Route path="/gererNotif/:id/:code/:tt" element={<GererNotif />} />
    <Route path="/gererNotif1/:id/:code/:tt" element={<GererNotif1 />} />
    <Route path="/AddSalle/:code" element={<AddSalle />} />
    <Route path="/editSalle/:id/:code" element={<EditSalle />} />
    <Route path="/gererAttent/:code" element={<GererAttent />} />
    <Route path="/consultsd/:code" element={<ConsultSd />} />
    <Route path="/profile/:code" element={<Profile />} />

        
       
      </Routes>
    </Router>
    );
}

export default App;
