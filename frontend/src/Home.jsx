import logo from "/logo.svg";
import { Link } from 'react-router-dom';

console.log("Hello")

export default function Home() {
  return (
    <div className="main--content">
      <img src={logo} alt="Logo" />
      <p>Adresse e-mail</p>
      <input type="text" className="login" />
      <p>Mot de passe</p>
      <input type="password" className="login" />
      <div className="login--button">
        <Link to="/Homepage"><p>Connexion</p></Link>
        </div>
        <p>
Vous n'avez pas encore de compte ?


        <Link to="/register"><p>Inscrivez-vous ici</p></Link></p>

    </div>
  );
}
