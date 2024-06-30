import React, { useState, useEffect } from 'react'; // Import de React et des hooks useState et useEffect
import { Link, useParams, useNavigate } from "react-router-dom"; // Import de Link, useParams et useNavigate de react-router-dom
import Layout from "./Layout"; // Import du composant Layout
import Swal from 'sweetalert2'; // Import de SweetAlert2 pour les alertes
import axios from 'axios'; // Import d'axios pour les requêtes HTTP
import { MdCancel } from "react-icons/md"; // Import de l'icône d'annulation de react-icons
import { FaRegSave } from "react-icons/fa"; // Import de l'icône de sauvegarde de react-icons
import { IconContext } from "react-icons"; // Import de IconContext de react-icons

function EditMovie() {
    const [id, setId] = useState(useParams().id); // Récupération de l'ID du film à partir des paramètres d'URL
    const [movie, setMovie] = useState({ title: '', description: '', releaseDate: '' }); // État pour les données du film
    const [isSaving, setIsSaving] = useState(false); // État pour suivre la sauvegarde en cours
    const navigate = useNavigate(); // Hook pour la navigation

    // useEffect pour charger les données du film lors du montage du composant
    useEffect(() => {
        axios.get(`/api/movies/${id}`) // Requête GET pour récupérer les détails du film
            .then(function (response) {
                setMovie(response.data); // Mise à jour de l'état avec les données du film
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Une erreur est survenue !',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }, []);

    // Fonction pour annuler la modification et naviguer vers la page d'accueil
    const cancelMovie = () => {
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

    // Fonction pour gérer la sauvegarde des modifications
    const handleSave = (e) => {
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
        setIsSaving(true); // Activation de l'état de sauvegarde
        axios.patch(`/movies/${id}`, movie) // Requête PATCH pour mettre à jour le film
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: response.data,
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsSaving(false);
                navigate("/"); // Navigation vers la page d'accueil après la sauvegarde
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Une erreur est survenue !',
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsSaving(false); // Désactivation de l'état de sauvegarde en cas d'erreur
            });
    }

    return (
        <Layout>
            <h2>Modification d'un film</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input 
                        onChange={handleChange}
                        value={movie.title}
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        value={movie.description}
                        onChange={handleChange}
                        className="form-control"
                        id="description"
                        rows="10"
                        name="description"
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="releaseDate">Date de sortie</label>
                    <input 
                        type="date" 
                        value={movie.releaseDate} 
                        onChange={handleChange} 
                        id="releaseDate" 
                        name="releaseDate" 
                    />
                </div>
                <div className="form-control-movie">
                    <button title="Annuler" onClick={cancelMovie}>
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

export default EditMovie;