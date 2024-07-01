// import { useRef, useState, useEffect } from "react";
// import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "../api/axios";

// const REGISTER_URL = '/register';

// const Register = () => {
//     const userRef = useRef();
//     const errRef = useRef();

//     const [prenom, setPrenom] = useState('');
//     const [nom, setNom] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [telephone, setTelephone] = useState('');
//     const [role, setRole] = useState('parent');

//     const [errMsg, setErrMsg] = useState('');
//     const [success, setSuccess] = useState(false);

//     useEffect(() => {
//         userRef.current.focus();
//     }, []);

//     useEffect(() => {
//         setErrMsg('');
//     }, [prenom, nom, email, password, telephone, role]);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(
//                 REGISTER_URL,
//                 JSON.stringify({ prenom, nom, email, password, telephone, role }),
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true
//                 }
//             );
//             console.log(response?.data);
//             setSuccess(true);
//             setPrenom('');
//             setNom('');
//             setEmail('');
//             setPassword('');
//             setTelephone('');
//             setRole('parent');
//         } catch (err) {
//             if (!err?.response) {
//                 setErrMsg('No Server Response');
//             } else if (err.response?.status === 409) {
//                 setErrMsg('Username Taken');
//             } else {
//                 setErrMsg('Registration Failed');
//             }
//             errRef.current.focus();
//         }
//     };

//     return (
//         <>
//             {success ? (
//                 <section>
//                     <h1>Success!</h1>
//                     <p>
//                         <a href="/">Sign In</a>
//                     </p>
//                 </section>
//             ) : (
//                 <section>
//                     <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
//                     <h1>Register</h1>
//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="prenom">First Name:</label>
//                         <input
//                             type="text"
//                             id="prenom"
//                             ref={userRef}
//                             autoComplete="off"
//                             onChange={(e) => setPrenom(e.target.value)}
//                             value={prenom}
//                             required
//                         />

//                         <label htmlFor="nom">Last Name:</label>
//                         <input
//                             type="text"
//                             id="nom"
//                             autoComplete="off"
//                             onChange={(e) => setNom(e.target.value)}
//                             value={nom}
//                             required
//                         />

//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             autoComplete="off"
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                             required
//                         />

//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                             required
//                         />

//                         <label htmlFor="telephone">Telephone:</label>
//                         <input
//                             type="tel"
//                             id="telephone"
//                             onChange={(e) => setTelephone(e.target.value)}
//                             value={telephone}
//                             required
//                         />

//                         <label htmlFor="role">Role:</label>
//                         <select
//                             id="role"
//                             onChange={(e) => setRole(e.target.value)}
//                             value={role}
//                             required
//                         >
//                             <option value="parent">Parent</option>
//                             <option value="grand parent">Grand parent</option>
//                         </select>

//                         <button type="submit">Register</button>
//                     </form>
//                 </section>
//             )}
//         </>
//     );
// };

// export default Register;

import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link } from "react-router-dom";

const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [prenom, setPrenom] = useState('');
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [role, setRole] = useState('parent');

    const [validPrenom, setValidPrenom] = useState(true);
    const [validNom, setValidNom] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validConfirmPassword, setValidConfirmPassword] = useState(true);
    const [validTelephone, setValidTelephone] = useState(true);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    const TELEPHONE_REGEX = /^\d{10}$/;

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidPrenom(prenom.length >= 4);
    }, [prenom]);

    useEffect(() => {
        setValidNom(nom.length >= 4);
    }, [nom]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password]);

    useEffect(() => {
        setValidConfirmPassword(password === confirmPassword && confirmPassword.length > 0);
    }, [password, confirmPassword]);

    useEffect(() => {
        setValidTelephone(TELEPHONE_REGEX.test(telephone));
    }, [telephone]);

    useEffect(() => {
        setErrMsg('');
    }, [prenom, nom, email, password, confirmPassword, telephone, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validPrenom || !validNom || !validEmail || !validPassword || !validConfirmPassword || !validTelephone) {
            setErrMsg("Invalid input. Please check the fields.");
            return;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ prenom, nom, email, password, telephone, role }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response?.data);
            setSuccess(true);
            setPrenom('');
            setNom('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setTelephone('');
            setRole('parent');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('Pas de réponse du serveur');
            } else if (err.response?.status === 409) {
                setErrMsg('Compte déja enregistrée avec cet email');
            } else {
                setErrMsg('Enregistrement échoué, votre mail est peut-être déjà utilisé.');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section className="register-div">
                    <h1 className="register--success">Enregistrement effectuée <br /><FontAwesomeIcon icon={faCheck} classname="valid"/></h1>
                    <div className="login--button">
                    <Link to="/Login">Connectez-vous dès à présent.</Link>
                    </div>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className ="register-title">Crée votre compte : </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="prenom">
                                Prénom(s):
                                {validPrenom ? (
                                    <FontAwesomeIcon icon={faCheck} className="valid green"/>
                                ) : (
                                    <FontAwesomeIcon icon={faTimes} className="invalid" />
                                )}
                            </label>
                            <input
                                type="text"
                                id="prenom"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setPrenom(e.target.value)}
                                value={prenom}
                                required
                            />
                            {!validPrenom && prenom.length > 0 && (
                                <p className="validation-message">
                                    <FontAwesomeIcon icon={faInfoCircle} /> Doit contenir 4 lettres au minimum.
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="nom">
                                Nom de famille:
                                {validNom ? (
                                    <FontAwesomeIcon icon={faCheck} className="valid" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimes} className="invalid" />
                                )}
                            </label>
                            <input
                                type="text"
                                id="nom"
                                autoComplete="off"
                                onChange={(e) => setNom(e.target.value)}
                                value={nom}
                                required
                            />
                            {!validNom && nom.length > 0 && (
                                <p className="validation-message">
                                    <FontAwesomeIcon icon={faInfoCircle} /> Doit contenir 4 lettres au minimum
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="email">
                                Email:
                                {validEmail ? (
                                    <FontAwesomeIcon icon={faCheck} className="valid" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimes} className="invalid" />
                                )}
                            </label>
                            <input
                                type="email"
                                id="email"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                            {!validEmail && email.length > 0 && (
                                <p className="validation-message">
                                    <FontAwesomeIcon icon={faInfoCircle} /> Doit être au format john@doe.com.
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password">
                                Mot de passe:
                                {validPassword ? (
                                    <FontAwesomeIcon icon={faCheck} className="valid" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimes} className="invalid" />
                                )}
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            {!validPassword && password.length > 0 && (
                                <p className="validation-message">
                                    <FontAwesomeIcon icon={faInfoCircle} />
                            Doit contenir de 8 à 24 caractères.<br />
                            Doit comprendre des lettres majuscules et minuscules, <br />un chiffre et un caractère spécial.<br />
                            Caractères spéciaux autorisés : <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>

                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="confirmPassword">
                                Confirmez votre mot de passe:
                                {validConfirmPassword ? (
                                    <FontAwesomeIcon icon={faCheck} className="valid" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimes} className="invalid" />
                                )}
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                            />
                            {!validConfirmPassword && confirmPassword.length > 0 && (
                                <p className="validation-message">
                                    <FontAwesomeIcon icon={faTimes} /> Les mots de passe ne correspondent pas.
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="telephone">
                                Telephone:
                                {validTelephone ? (
                                    <FontAwesomeIcon icon={faCheck} className="valid" />
                                ) : (
                                    <FontAwesomeIcon icon={faTimes} className="invalid" />
                                )}
                            </label>
                            <input
                                type="tel"
                                id="telephone"
                                onChange={(e) => setTelephone(e.target.value)}
                                value={telephone}
                                required
                            />
                            {!validTelephone && telephone.length > 0 && (
                                <p className="validation-message">
                                    <FontAwesomeIcon icon={faTimes} /> Format : 0601020304 (10 chiffres)
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="role">Role:</label>
                            <select
                                id="role"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                                required
                            >
                                <option value="parent">Parent</option>
                                <option value="grandparent">Grandparent</option>
                            </select>
                        </div>

                        <button disabled={!validPrenom || !validNom || !validEmail || !validPassword || !validConfirmPassword || !validTelephone ? true : false}>
                            S'enregistrer
                        </button>
                    </form>
                    <Link to="/Login"><p className="login">Vous avez déjà un compte? Connectez-vous</p></Link>
                </section>
            )}
        </>
    );
};

export default Register;
