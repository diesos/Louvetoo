import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../api/axios.js';

export default function ChildForm() {
    const [formData, setFormData] = useState({
        id: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        allergy: "",
        diet: ""
    });

    const [successData, setSuccessData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); // Nouvel état pour gérer les erreurs
    const [allChildren, setAllChildren] = useState([]);
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
            date_naissance: formData.birthdate,
            allergie: formData.allergy,
            diet: formData.diet
        };

        try {
            let response;
            if (currentAction === 'edit') {
                response = await axios.put(`http://localhost:3000/api/children/updatechild/${formData.id}`, data);
            } else if (currentAction === 'add') {
                response = await axios.post('http://localhost:3000/api/children/addchild', data);
            }
            console.log(response.data); // Log response data
            const { createdAt, updatedAt, ...filteredData } = response.data.data;
            filteredData.date_naissance = new Date(filteredData.date_naissance).toLocaleDateString('fr-FR');
            setSuccessData({
                message: response.data.message,
                data: filteredData
            });
            setFormData({
                id: "",
                firstname: "",
                lastname: "",
                birthdate: "",
                allergy: "",
                diet: ""
            });
            setCurrentAction('add');
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage(error.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/children/deletechild/${formData.id}`);
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message
            });
            setFormData({
                id: "",
                firstname: "",
                lastname: "",
                birthdate: "",
                allergy: "",
                diet: ""
            });
            setCurrentAction('add');
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error deleting child:", error);
            setErrorMessage(error.message);
        }
    };

    const fetchAllChildren = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/children/getallchildren');
            console.log(response.data); // Log response data
            setAllChildren(response.data.data);
            console.log(allChildren.length)
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error fetching all children:", error);
            setErrorMessage(error.message);
        }
    };

    const fetchChildById = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/children/getchild/${formData.id}`);
            console.log(response.data); // Log response data
            const { createdAt, updatedAt, ...filteredData } = response.data.data;
            filteredData.date_naissance = new Date(filteredData.date_naissance).toLocaleDateString('fr-FR');
            setSuccessData({
                message: response.data.message,
                data: filteredData
            });
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error fetching child by ID:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                <button onClick={() => setCurrentAction('add')}>Ajouter un Enfant</button>
                <button onClick={() => setCurrentAction('edit')}>Éditer un Enfant</button>
                <button onClick={() => setCurrentAction('delete')}>Supprimer un Enfant</button>
                <button onClick={() => setCurrentAction('getAll')}>Voir tous les Enfants</button>
                <button onClick={() => setCurrentAction('getById')}>Rechercher un Enfant</button>
            </div>
            <h1 style={{textAlign: 'center', margin: '15px'}}>{currentAction === 'edit' ? "Modifier un Enfant" : currentAction === 'delete' ? "Supprimer un Enfant" : currentAction === 'getById' ? "Rechercher un Enfant" : "Ajouter un Enfant"}</h1>
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
                    <button onClick={fetchAllChildren}>Voir tous les Enfants</button>
                    {allChildren.length > 0 && (
                        <div>
                            <h2>Tous les enfants:</h2>
                            {/*TODO:  const allChildrenList = allChildren.map(child => ( */}
                            <pre>{JSON.stringify(allChildren, null, 2)}</pre>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={currentAction === 'delete' ? handleDelete : currentAction === 'getById' ? fetchChildById : handleSubmit}>
                    {(currentAction === 'edit' || currentAction === 'delete' || currentAction === 'getById') && (
                        <div>
                            <label htmlFor="id">ID de l'Enfant: </label>
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
                                <label htmlFor="birthdate">Date de naissance:</label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="allergy">Allergie(s):</label>
                                <input
                                    type="text"
                                    id="allergy"
                                    name="allergy"
                                    value={formData.allergy}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="diet">Diet:</label>
                                <input
                                    type="text"
                                    id="diet"
                                    name="diet"
                                    value={formData.diet}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <button type="submit">{currentAction === 'edit' ? "Modifier un Enfant" : currentAction === 'delete' ? "Supprimer un Enfant" : currentAction === 'getById' ? "Rechercher un Enfant" : "Ajouter un Enfant"}</button>
                </form>

            )}
            <Link to='/admindashboard'><button style={{textAlign:'center', marginLeft: '15px', marginTop:'15px'}}>Retour à l'Admin Dashboard</button></Link>
        </>
    );
}
