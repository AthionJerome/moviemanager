// Importation de la bibliothèque React
import React from 'react';
// Importation de StrictMode pour activer des vérifications supplémentaires dans le mode strict
import { StrictMode } from "react";
// Importation des fonctions de ReactDOM pour créer et gérer le rendu du DOM
import { createRoot } from "react-dom/client";
// Importation des composants de react-router-dom pour la gestion des routes
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importation des différents composants de l'application
import MoviesList from "./components/MoviesList";
import CreateMovie from "./components/CreateMovie";
import EditMovie from "./components/EditMovie";
import Movie from "./components/Movie";
    
// Déclaration du composant fonctionnel Main qui définit les routes de l'application
function Main() {
    return (
        // Définition du routeur principal pour l'application
        <Router>
            <Routes>
                {/* Définition de la route pour la page d'accueil affichant la liste des films */}
                <Route exact path="/" element={<MoviesList />} />
                {/* Définition de la route pour la création d'un nouveau film */}
                <Route path="/create" element={<CreateMovie />} />
                {/* Définition de la route pour l'édition d'un film existant, identifié par son ID */}
                <Route path="/edit/:id" element={<EditMovie />} />
                {/* Définition de la route pour afficher les détails d'un film, identifié par son ID */}
                <Route path="/show/:id" element={<Movie />} />
            </Routes>
        </Router>
    );
}
    
// Exportation du composant Main pour qu'il puisse être importé et utilisé dans d'autres fichiers
export default Main;
    
// Sélection de l'élément DOM avec l'ID "app" pour y monter l'application React
const rootElement = document.getElementById("app");
// Création de la racine React pour gérer le rendu du composant Main
const root = createRoot(rootElement);

// Rendu du composant Main dans le DOM, avec le mode strict activé pour des vérifications supplémentaires
root.render(
    <StrictMode>
        <Main />
    </StrictMode>
);