// Importation des bibliothèques React et des hooks useState et useEffect
import React, { useState, useEffect } from 'react';
// Importation de la bibliothèque react-router-dom pour la navigation
import { Link } from "react-router-dom";
// Importation du composant Layout pour la mise en page
import Layout from "./Layout";
// Importation de la bibliothèque SweetAlert2 pour les alertes
import Swal from 'sweetalert2';
// Importation de la bibliothèque axios pour les requêtes HTTP
import axios from 'axios';
// Importation de la bibliothèque react-icons pour les icônes
import { IconContext } from "react-icons";
import { FaPlusCircle, FaEye } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

// Déclaration du composant fonctionnel MoviesList
function MoviesList() {
    // Déclaration d'un état local pour stocker la liste des films
    const [moviesList, setMoviesList] = useState([]);
  
    // Utilisation du hook useEffect pour exécuter la fonction fetchMoviesList lors du montage du composant
    useEffect(() => {
        fetchMoviesList();
    }, []);
  
    // Fonction pour récupérer la liste des films depuis l'API
    const fetchMoviesList = () => {
        axios.get('/api/list')
        .then(function (response) {
            // Mise à jour de l'état moviesList avec les données récupérées
            setMoviesList(response.data);
        })
        .catch(function (error) {
            // Affichage d'une alerte en cas d'erreur lors de la récupération des films
            Swal.fire({
                icon: 'error',
                title: 'Une erreur est survenue lors de la récupération des films !',
                showConfirmButton: false,
                timer: 1500
            });
        });
    };
  
    // Fonction pour gérer la suppression d'un film
    const handleDelete = (id) => {
        // Affichage d'une alerte de confirmation avant la suppression
        Swal.fire({
            title: 'Êtes-vous sûr de vouloir supprimer ce film ?',
            text: "Cette action est irréversible !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Annuler'
        }).then((result) => {
            if (result.isConfirmed) {
                // Suppression du film via une requête axios
                axios.delete(`/movies/${id}`)
                .then(function (response) {
                    // Affichage d'une alerte de succès et mise à jour de la liste des films
                    Swal.fire({
                        icon: 'success',
                        title: 'Film supprimé avec succès !',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    fetchMoviesList();
                })
                .catch(function (error) {
                    // Affichage d'une alerte en cas d'erreur lors de la suppression
                    Swal.fire({
                        icon: 'error',
                        title: 'Une erreur est survenue !',
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
            }
        });
    };
  
    // Rendu du composant
    return (
        <Layout>
            <h2>Gestionnaire de films</h2>
            <IconContext.Provider value={{ color: "green" }}>
                <div className="actionMovie">
                    <Link to="/create">
                        <button title="Ajouter un film">
                            <FaPlusCircle />
                        </button>
                    </Link>
                </div>
            </IconContext.Provider>
            <div className="containerMovies">
            {moviesList.map((movie, key) => {
                return (
                    <div className="card" key={key}>
                        <div className="card-header">
                            <label>Titre du film : </label>
                            <p>{movie.title}</p>
                        </div>
                        <div className="card-body">
                            <label>Description du film : </label>
                            <p>{movie.description}</p>
                            <label>Date de sortie : </label>
                            <p>{movie.releaseDate}</p>
                        </div>
                        <div className="card-footer">
                            <Link to={`/show/${movie.id}`}>
                                <button title="Voir le film">
                                    <IconContext.Provider value={{ color: "grey", size: "20px" }}>
                                        <div>
                                            <FaEye />
                                        </div>
                                    </IconContext.Provider>
                                </button>
                            </Link>
                            <Link to={`/edit/${movie.id}`}>
                                <button title="Modifier ce film">
                                    <IconContext.Provider value={{ color: "orange", size: "20px" }}>
                                        <div>
                                            <CiEdit />
                                        </div>
                                    </IconContext.Provider>
                                </button>
                            </Link>
                            <button title="Supprimer ce film" onClick={() => handleDelete(movie.id)} id="delBtn">
                                <IconContext.Provider value={{ color: "red", size: "20px" }}>
                                    <div>
                                        <MdDelete />
                                    </div>
                                </IconContext.Provider>
                            </button>
                        </div>
                    </div>
                );
            })}
            </div>
        </Layout>
    );
}

// Exportation du composant MoviesList pour qu'il puisse être utilisé dans d'autres parties de l'application
export default MoviesList;