// J'importe la fonction de recherche depuis le fichier API
import { chercherFilms } from './api.js' ;

// Je récupère les conteneurs du HTML avec leur id
let conteneurTendances = document.getElementById( 'tendances' ) ;
let conteneur2024 = document.getElementById('filmsde2024') ;
let btn2024 = document.getElementById( 'button2024' ) ;

// Là je définis la variable pour savoir quelle page des films de 2024 je charge
let page2024 = 1 ;

// Là c'est ma fonction pour faire une carte de film et pouvoir l'afficher
function afficherCarteFilm(film, conteneurParent) {

  // Je crée la div de la carte
  let div = document.createElement( 'div' ) ;
  div.className = 'detailsduFilm' ;

  // Je crée la balise image
  let img = document.createElement('img') ;
  
  // Je regarde si le film a une affiche, sinon je met une image par défaut avec mon else et N/A
  if (film.Poster !== 'N/A') {
    img.src = film.Poster ;
  } else {
    img.src = 'https://via.placeholder.com/200x300?text=Pas+d+image' ;
  }
  img.alt = film.Title ;

  // Je crée le titre
  let h3 = document.createElement('h3') ;
  h3.textContent = film.Title ;

  // Je crée le texte pour l'année
  let p = document.createElement( 'p' ) ;
  p.textContent = film.Year ;

  // Je crée le lien vers la page du film avec son id dans l'URL
  let lien = document.createElement('a') ;
  lien.href = `movie.html?id=${film.imdbID}` ;
  lien.textContent = 'En savoir plus' ;

  // Je mets tous mes elements dans la div
  div.appendChild(img) ;
  div.appendChild(h3) ;
  div.appendChild(p) ;
  div.appendChild(lien) ;

  // J'ajoute la div dans mon bloc HTML
  conteneurParent.appendChild(div) ;
}

// Là c'est ma fonction pour afficher les films tendances
async function chargerTendances() {
  // Je cherche des films sur Avengers
  let reponse = await chercherFilms('Avengers') ;

  if (reponse && reponse.Response === 'True') {

    // Je garde juste les 8 premiers films avec une boucle classique for
    for (let i = 0 ; i < 8 ; i++) {
      if (reponse.Search[i]) {
        afficherCarteFilm(reponse.Search[i] , conteneurTendances) ;
      }
    }
  } else {
    conteneurTendances.textContent = 'Impossible de charger les tendances.' ;
  }
}

// Ma fonction asynchrone pour charger les films de 2024
async function chargerFilms2024() {
  let reponse = await chercherFilms( 'movie' , page2024 , '2024' ) ;

  if (reponse && reponse.Response === 'True') {
    for (let i = 0 ; i < reponse.Search.length ; i++) {
      afficherCarteFilm(reponse.Search[i] , conteneur2024) ;
    }
  }
}

// Quand je clique sur le bouton, je charge la page suivante
btn2024.addEventListener('click' , function() {

  page2024++ ; // Je rajoute +1 a la page
  chargerFilms2024() ; // Je relance le chargement
}) ;

// Je lance mes fonctions quand la page s'ouvre
chargerTendances() ;
chargerFilms2024() ;