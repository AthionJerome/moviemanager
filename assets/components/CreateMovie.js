import React, { useState } from 'react'; // Import de React et du hook useState
import { Link, useNavigate } from "react-router-dom"; // Import de Link et useNavigate de react-router-dom
import Layout from "./Layout"; // Import du composant Layout
import Swal from 'sweetalert2'; // Import de SweetAlert2 pour les alertes
import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { MdCancel } from "react-icons/md"; // Import de l'icône d'annulation de react-icons
import { FaRegSave } from "react-icons/fa"; // Import de l'icône de sauvegarde de react-icons
import { IconContext } from "react-icons"; // Import de IconContext de react-icons

function CreateMovie() {
    // Déclaration des états pour le film et l'état de sauvegarde
    const [movie, setMovie] = useState({ title: '', description: '', releaseDate: '' });
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate(); // Hook pour la navigation

    // Fonction pour annuler la création et naviguer vers la page d'accueil
    const cancelCreation = () => {
        navigate("/");
    }

    // Fonction pour gérer les changements dans les champs de formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie(prevMovie => ({
            ...prevMovie,
            [name]: value
        }));
    };

    // Fonction pour vérifier que les champs obligatoires sont remplis
    const formControl = () => {
        return !!movie.title && !!movie.description;
    }

    // Fonction pour gérer la sauvegarde du film
    const handleSave = (e) => {
        // Vérifie que les champs obligatoires sont remplis
        if (!formControl()) {
            Swal.fire({
                icon: 'error',
                title: 'Le << titre >> ainsi que la << description >> sont des champs obligatoires !',
                showConfirmButton: false,
                timer: 1500
            });
            e.preventDefault();
            return false;
        }
        setIsSaving(true); // Active l'état de sauvegarde
        // Envoie une requête POST pour créer un nouveau film
        axios.post('/api/movie', JSON.stringify(movie))
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Film crée avec succès !',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsSaving(false);
                navigate("/"); // Navigue vers la page d'accueil après la sauvegarde
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Une erreur est survenue !',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsSaving(false); // Désactive l'état de sauvegarde en cas d'erreur
            });
    }

    return (
        <Layout>
            <h2>Créer un nouveau film</h2>
            <form>
                <div>
                    <label>Titre:</label>
                    <input type="text" value={movie.title} onChange={handleChange} name="title" required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={movie.description} onChange={handleChange} name="description" rows="10"></textarea>
                </div>
                <div>
                    <label>Date de sortie:</label>
                    <input type="date" value={movie.releaseDate} onChange={handleChange} name="releaseDate" />
                </div>
                <div className="form-control-movie">
                    <button title="Annuler" onClick={cancelCreation}>
                        <IconContext.Provider value={{ color: "#429bf5", size: "20px" }}>
                            <div>
                                <MdCancel />
                            </div>
                        </IconContext.Provider>
                    </button>
                    <button title="Enregistrer" disabled={isSaving} onClick={handleSave} type="button">
                        <IconContext.Provider value={{ color: "grey", size: "20px" }}>
                            <div>
                                <FaRegSave />
                            </div>
                        </IconContext.Provider>
                    </button>
                </div>
            </form>
        </Layout>
    );
}

export default CreateMovie;