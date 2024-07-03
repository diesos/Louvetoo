// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Ensure cookies are sent with the request
//         const response = await axios.get('/profil', { withCredentials: true });

//         setUser(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération du profil utilisateur :', error);
//         setError('Erreur lors de la récupération du profil utilisateur');
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (error) {
//     return <div>Erreur : {error}</div>;
//   }

//   if (!user) {
//     return <div>Chargement...</div>;
//   }

//   return (
//     <div>
//       <h2>Bienvenue, {user.prenom} {user.nom} !</h2>
//       <p>Email : {user.email}</p>
//       <p>Téléphone : {user.telephone}</p>
//       <p>Rôle : {user.role}</p>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profil', { withCredentials: true });
        setUser(response.data);
        console.log(response)
        console.log(response.data)
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
        setError('Erreur lors de la récupération du profil utilisateur');
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  if (!user) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2>Bienvenue, {user.prenom} {user.nom} !</h2>
      <p>Email : {user.email}</p>
      <p>Téléphone : {user.telephone}</p>
      <p>Rôle : {user.role}</p>
    </div>
  );
};

export default Profile;
