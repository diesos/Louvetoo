import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import logo from '/logo.svg';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

const LOGIN_URL = '/login';
const CHECK_SESSION_URL = '/check-session';

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(CHECK_SESSION_URL, { withCredentials: true });
        if (response.data.loggedIn) {
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Failed to check session:', err);
      }
    };

    checkSession();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      const response = await axios.post(LOGIN_URL, { email, password }, { withCredentials: true });
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setAuth({ email, password, role, accessToken });
      setEmail('');
      setPassword('');
      console.log("Après ça")
      console.log(JSON.stringify(response?.data))
      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Pas de réponse du serveur, veuillez réessayer.');
      } else if (err.response?.status === 401) {
        setErrMsg('Adresse e-mail ou mot de passe incorrect.');
      } else {
        setErrMsg('Connexion échouée, veuillez réessayer.');
      }
    }
  };

  return (
    <div className="main--content">
      <img src={logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        {errMsg && <p className="errmsg">{errMsg}</p>}
        <p className='login-text'>Adresse e-mail</p>
        <input
          type="text"
          className="login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
         <p className='login-text'>Mot de passe</p>
        <input
          type="password"
          className="login"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
          <button type="submit">Connexion</button>
          <p className='login-text'>
          Vous n'avez pas encore de compte ?
          <Link to="/register">
            <p>Inscrivez-vous ici</p>
          </Link>
        </p>
      </form>
    </div>
  );
}
