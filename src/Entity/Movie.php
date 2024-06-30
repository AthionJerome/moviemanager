<?php

// Déclaration du namespace de la classe, qui correspond à la structure des répertoires
namespace App\Entity;

// Importation des classes nécessaires à partir de Doctrine et du répertoire MovieRepository
use App\Repository\MovieRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

// Annotation indiquant que cette classe est une entité Doctrine et spécifiant le répertoire associé
#[ORM\Entity(repositoryClass: MovieRepository::class)]
class Movie
{
    // Déclaration de la propriété $id comme clé primaire, avec génération automatique de la valeur
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    // Déclaration de la propriété $title comme une colonne de type string avec une longueur maximale de 255 caractères
    #[ORM\Column(length: 255)]
    private ?string $title = null;

    // Déclaration de la propriété $description comme une colonne de type string avec une longueur maximale de 255 caractères
    #[ORM\Column(length: 255)]
    private ?string $description = null;

    // Déclaration de la propriété $releaseDate comme une colonne de type date, nullable
    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $releaseDate = null;

    // Getter pour la propriété $id
    public function getId(): ?int
    {
        return $this->id;
    }

    // Getter pour la propriété $title
    public function getTitle(): ?string
    {
        return $this->title;
    }

    // Setter pour la propriété $title avec retour de l'instance de l'objet (pour chainage)
    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    // Getter pour la propriété $description
    public function getDescription(): ?string
    {
        return $this->description;
    }

    // Setter pour la propriété $description avec retour de l'instance de l'objet (pour chainage)
    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    // Getter pour la propriété $releaseDate
    public function getReleaseDate(): ?\DateTimeInterface
    {
        return $this->releaseDate;
    }

    // Setter pour la propriété $releaseDate avec retour de l'instance de l'objet (pour chainage)
    public function setReleaseDate(?\DateTimeInterface $releaseDate): static
    {
        $this->releaseDate = $releaseDate;

        return $this;
    }
}