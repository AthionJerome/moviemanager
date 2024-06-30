// Importation de la bibliothèque React
import React from 'react';

// Déclaration du composant fonctionnel Layout
// Le composant accepte une propriété 'children' qui représente les éléments enfants passés au composant
const Layout = ({ children }) => {
    // Le composant retourne une div avec une classe "container" qui englobe les enfants passés en propriété
    return (
        <div className="container">
            {children}
        </div>
    );
};

// Exportation du composant Layout pour qu'il puisse être importé et utilisé dans d'autres fichiers
export default Layout;