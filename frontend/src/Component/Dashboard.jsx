// import { useState, useEffect } from "react";
// import Cards from "./Cards";
// import axios from '../api/axios';



// export default function MainContent() {

// 	const [user, setUser] = useState(null);
// 	const [error, setError] = useState(null);

//   let newDate = new Date();
//   let date = newDate.getDate();
//   let month = newDate.getMonth() + 1;
//   let year = newDate.getFullYear();
//   let hours = newDate.getHours();
//   let minutes = newDate.getMinutes();
//   let day = newDate.getDay() - 1;

//   // Array containing weeks
//   const dayOfWeek = [
//     "Lundi",
//     "Mardi",
//     "Mercredi",
//     "Jeudi",
//     "Vendredi",
//     "Samedi",
//     "Dimanche",
//   ];
//   // Array containing month
//   const selectMonth = [
//     "Janvier",
//     "Février",
//     "Mars",
//     "Avril",
//     "Mai",
//     "Juin",
//     "Juillet",
//     "Août",
//     "Septembre",
//     "Octobre",
//     "Novembre",
//     "Décembre",
//   ];

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Appel de l'API pour récupérer les informations du profil de l'utilisateur
//         const response = await axios.get('/profil'); // Endpoint correct : '/profil'

//         // Mettre à jour l'état local avec les données de l'utilisateur
//         setUser(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération du profil utilisateur :', error);
//         console.log('Détails de l\'erreur Axios :', error.response); // Log des détails de l'erreur Axios
//         setError('Erreur lors de la récupération du profil utilisateur');

//       }
//     };

//     fetchProfile();
//   }, []); // Dépendance vide pour exécuter une seule fois après le montage du composant

//   console.log(user)
//   console.log(error)

//   // Const for storing day format : YYYY-MM-DD for Calendar value
//   let today = `${year}-${month.toString().padStart(2, "0")}-${date
//     .toString()
//     .padStart(2, "0")}`;
//   const [dateValue, setDateValue] = useState(today);

//   //useState for updating calendar date
//   function dateHandler(event) {
//     setDateValue((prevValue) => event.target.value);
//   }

//   // For getting exact day in words and sentences
//   const getCurrentDate = () =>
//     `${dayOfWeek[day]}  ${date} ${
//       selectMonth[month - 1]
//     } ${year} il est : ${hours}:${minutes}`;

//   return (
//     <>
//       <div className="child--content">
//         <div className="child--inner">
//           <div className="profil-pic">
//             <img src="./ai.png" alt="profil picture" />
//           </div>
//           <div className="details">
//             <p>Bonjour </p>
//             <p>Nous sommes le {getCurrentDate()}</p>
//             <p>Enfants : 14 (Recordman du nombre d'enfants)</p>
//           </div>
//         </div>
//       </div>
//       <label htmlFor="start">Start date:</label>

//       <input
//         type="date"
//         id="start"
//         name="show-day"
//         value={dateValue}
//         onChange={dateHandler}
//         min="2024-01-01"
//         max="2026-12-31"
//       />
//       <Cards value="2" />
//       <Cards value="2" />
//       <Cards value="0" />
//       <Cards value="4" />
//       <Cards value="4" />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import Cards from "./Cards";
import axios from '../api/axios';

export default function MainContent() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let hours = newDate.getHours();
  let minutes = newDate.getMinutes();
  let day = newDate.getDay() - 1;

  const dayOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  const selectMonth = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profil');
        setUser(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur :', error);
        setError('Erreur lors de la récupération du profil utilisateur');
      }
    };

    fetchProfile();
  }, []);

  const getCurrentDate = () => `${dayOfWeek[day]} ${date} ${selectMonth[month - 1]} ${year} il est : ${hours}:${minutes}`;

  return (
    <>
      <div className="child--content">
        <div className="child--inner">
          <div className="profil-pic">
            <img src="./ai.png" alt="profil picture" />
          </div>
          <div className="details">
            <p>Bonjour {user ? user.prenom : ''}</p>
            <p>Nous sommes le {getCurrentDate()}</p>
            <p>Enfants : 14 (Recordman du nombre d'enfants)</p>
          </div>
        </div>
      </div>
      <label htmlFor="start">Start date:</label>
      <input type="date" id="start" name="show-day" value={`${year}-${month.toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`} min="2024-01-01" max="2026-12-31" />
      <Cards value="2" />
      <Cards value="2" />
      <Cards value="0" />
      <Cards value="4" />
      <Cards value="4" />
    </>
  );
}
