import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../api/axios.js';

export default function AdminUsers() {
    const [formData, setFormData] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        telephone: "",
        role: "parent"
    });

    const [successData, setSuccessData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); // Nouvel état pour gérer les erreurs
    const [allUsers, setAllUsers] = useState([]);
    const [currentAction, setCurrentAction] = useState('add'); // 'add', 'edit', 'delete', 'getAll', 'getById'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            prenom: formData.firstname,
            nom: formData.lastname,
            email: formData.email,
            password: formData.password,
            telephone: formData.telephone,
            role: formData.role
        };

        try {
            let response;
            if (currentAction === 'edit') {
                response = await axios.put(`http://localhost:3000/api/users/updateuser/${formData.id}`, data);
            } else if (currentAction === 'add') {
                response = await axios.post('http://localhost:3000/api/users/adduser', data);
            }
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message,
                data: response.data.data
            });
            setFormData({
                id: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                telephone: "",
                role: "parent"
            });
            setCurrentAction('add');
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/users/deleteuser/${formData.id}`);
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message,
				messagePlus: response.data.data
            });
            setFormData({
                id: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                telephone: "",
                role: "parent"
            });
            setCurrentAction('add');
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error deleting user:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    const fetchAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/users/getallusers');
            console.log(response.data); // Log response data
            setAllUsers(response.data.data);
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error fetching all users:", error);
            setErrorMessage(error.message);
        }
    };

    const fetchUserById = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/users/getuser/${formData.id}`);
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message,
                data: response.data.data
            });
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                <button onClick={() => setCurrentAction('add')}>Ajouter un Utilisateur</button>
                <button onClick={() => setCurrentAction('edit')}>Éditer un Utilisateur</button>
                <button onClick={() => setCurrentAction('delete')}>Supprimer un Utilisateur</button>
                <button onClick={() => setCurrentAction('getAll')}>Voir tous les Utilisateurs</button>
                <button onClick={() => setCurrentAction('getById')}>Rechercher un Utilisateur</button>
            </div>
            <h1 style={{textAlign: 'center', margin: '15px'}}>{currentAction === 'edit' ? "Modifier un Utilisateur" : currentAction === 'delete' ? "Supprimer un Utilisateur" : currentAction === 'getById' ? "Rechercher un Utilisateur" : "Ajouter un Utilisateur"}</h1>
            {successData && (
                <div className="popup" style={{ border: "1px solid #000", padding: "10px", marginBottom: "20px" }}>
                    <p>{successData.message}</p>
                    {successData.data && (
                        <>
                            <p>Données soumises:</p>
                            <pre>{JSON.stringify(successData.data, null, 2)}</pre>
                        </>
                    )}
                    <button onClick={() => setSuccessData(null)}>Fermer</button>
                </div>
            )}
            {errorMessage && (
                <div className="error-message" style={{ backgroundColor: "red", color: "white", padding: "10px", marginBottom: "20px" }}>
                    <p>Error: {errorMessage}</p>
                </div>
            )}
            {currentAction === 'getAll' ? (
                <div style={{textAlign:'center'}}>
                    <button onClick={fetchAllUsers}>Voir tous les Utilisateurs</button>
                    {allUsers.length > 0 && (
                        <div>
                            <h2>Tous les utilisateurs:</h2>
                            <pre>{JSON.stringify(allUsers, null, 2)}</pre>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={currentAction === 'delete' ? handleDelete : currentAction === 'getById' ? fetchUserById : handleSubmit}>
                    {(currentAction === 'edit' || currentAction === 'delete' || currentAction === 'getById') && (
                        <div>
                            <label htmlFor="id">ID de l'Utilisateur: </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    {(currentAction === 'add' || currentAction === 'edit') && (
                        <>
                            <div>
                                <label htmlFor="firstname">Prénom:</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname">Nom:</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Mot de passe:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="telephone">Téléphone:</label>
                                <input
                                    type="tel"
                                    id="telephone"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="role">Rôle:</label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="parent">Parent</option>
                                    <option value="grandparent">Grand Parent</option>
                                    <option value="staff">Staff</option>
                                </select>
                            </div>
                        </>
                    )}
                    <button type="submit">{currentAction === 'edit' ? "Modifier un Utilisateur" : currentAction === 'delete' ? "Supprimer un Utilisateur" : currentAction === 'getById' ? "Rechercher un Utilisateur" : "Ajouter un Utilisateur"}</button>
                </form>

            )}
            <Link to='/admindashboard'><button style={{textAlign:'center', marginLeft: '15px', marginTop:'15px'}}>Retour à l'Admin Dashboard</button></Link>
        </>
    );
}
