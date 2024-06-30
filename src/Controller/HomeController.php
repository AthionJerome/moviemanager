<?php

// Déclaration du namespace de la classe, qui correspond à la structure des répertoires
namespace App\Controller;

// Importation des classes nécessaires à partir du composant Symfony FrameworkBundle et autres composants
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

// Déclaration de la classe HomeController qui étend AbstractController de Symfony
class HomeController extends AbstractController
{
    // Annotation de la route pour définir une URL spécifique, représentant ici la page d'accueil et son nom
    #[Route('/', name: 'app_home')]
    // Déclaration de la méthode index qui retourne un objet Response
    public function index(): Response
    {
        // Rendu du template Twig 'home/index.html.twig' et retour de la réponse
        return $this->render('home/index.html.twig');
    }
}