<?php

// Déclaration du namespace de la classe, qui correspond à la structure des répertoires
namespace App\Controller;

// Importation des classes nécessaires à partir du composant Symfony FrameworkBundle et autres composants
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Movie;
use Doctrine\ORM\EntityManagerInterface;

// Déclaration de la classe MovieController qui étend AbstractController de Symfony
class MovieController extends AbstractController
{
    // Route pour récupérer la liste de tous les films, méthode GET
    #[Route('/api/list', name: 'movie_list', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        // Récupération de tous les films à partir du repository Movie
        $movies = $doctrine->getRepository(Movie::class)->findAll();
   
        // Initialisation d'un tableau pour stocker les données des films
        $data = [];
   
        // Boucle sur chaque film pour extraire les données nécessaires
        foreach ($movies as $movie) {
            array_push($data, [
                'id' => $movie->getId(),
                'title' => $movie->getTitle(),
                'description' => $movie->getDescription(),
                'releaseDate' => $movie->getReleaseDate() ? date_format($movie->getReleaseDate(), "Y-m-d") : "N/A"
            ]);
        }
   
        // Retourne une réponse JSON contenant les données des films
        return $this->json($data);
    }

    // Route pour créer un nouveau film, méthode POST
    #[Route('/api/movie', name: 'movie_create', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        // Récupération de l'entity manager
        $entityManager = $doctrine->getManager();

        // Décodage du contenu JSON de la requête
        $content = json_decode($request->getContent());
        // Création d'un objet DateTime pour la date de sortie du film
        $releaseDate = $content->releaseDate ? new \DateTime($content->releaseDate) : null;
   
        // Création d'une nouvelle instance de l'entité Movie
        $movie = new Movie();
        $movie->setTitle($content->title);
        $movie->setDescription($content->description);
        $movie->setReleaseDate($releaseDate);
   
        // Persistance du nouvel objet Movie dans la base de données
        $entityManager->persist($movie);
        // Envoi des modifications à la base de données
        $entityManager->flush();
   
        // Retourne une réponse JSON indiquant que le film a été créé avec succès
        return $this->json('Le film a bien été créé !');
    }

    // Route pour afficher les détails d'un film spécifique, méthode GET
    #[Route("/api/movies/{id}", name: 'movie_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        // Récupération du film par son ID à partir du repository Movie
        $movie = $doctrine->getRepository(Movie::class)->find($id);
   
        // Vérification si le film existe, sinon retourne une réponse JSON avec un message d'erreur
        if (!$movie) return $this->json('No movie found for id ' . $id, 404);

        // Préparation des données du film à retourner
        $data =  [
            'id' => $movie->getId(),
            'title' => $movie->getTitle(),
            'description' => $movie->getDescription(),
            'releaseDate' => $movie->getReleaseDate() ? date_format($movie->getReleaseDate(), "Y-m-d") : null
        ];
           
        // Retourne une réponse JSON contenant les données du film
        return $this->json($data);
    }

    // Route pour modifier les détails d'un film existant, méthodes PUT et PATCH
    #[Route("/movies/{id}", name: 'movie_edit', methods: ['PUT', 'PATCH'])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        // Récupération de l'entity manager
        $entityManager = $doctrine->getManager();
        // Récupération du film par son ID à partir du repository Movie
        $movie = $entityManager->getRepository(Movie::class)->find($id);
   
        // Vérification si le film existe, sinon retourne une réponse JSON avec un message d'erreur
        if (!$movie) return $this->json('No movie found for id ' . $id, 404);
         
        // Décodage du contenu JSON de la requête
        $content = json_decode($request->getContent());
        // Mise à jour des propriétés du film avec les nouvelles données
        $movie->setTitle($content->title);
        $movie->setDescription($content->description);
        $movie->setReleaseDate($content->releaseDate ? new \DateTime($content->releaseDate) : null);
        // Envoi des modifications à la base de données
        $entityManager->flush();
           
        // Retourne une réponse JSON indiquant que le film a été modifié avec succès
        return $this->json("Votre film a bien été modifié !", 200);
    }

    // Route pour supprimer un film existant, méthode DELETE
    #[Route("/movies/{id}", name: 'movie_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        // Récupération de l'entity manager
        $entityManager = $doctrine->getManager();
        // Récupération du film par son ID à partir du repository Movie
        $movie = $entityManager->getRepository(Movie::class)->find($id);
   
        // Vérification si le film existe, sinon retourne une réponse JSON avec un message d'erreur
        if (!$movie) return $this->json('No movie found for id ' . $id, 404);
   
        // Suppression du film de la base de données
        $entityManager->remove($movie);
        // Envoi des modifications à la base de données
        $entityManager->flush();
   
        // Retourne une réponse JSON indiquant que le film a été supprimé avec succès
        return $this->json('Le film a bien été supprimé !');
    }
}