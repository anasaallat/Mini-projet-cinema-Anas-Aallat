// J'importe la fonction pour les details d'un film
import { obtenirDetailsFilm } from './api.js' ;

// Je récupère l'id du film qu'il y a dans l'adresse de la page
let parametresURL = new URLSearchParams(window.location.search) ;
let idFilm = parametresURL.get('id') ;

// Je récupère le conteneur principal
let conteneurDetails = document.getElementById( 'detailsduFilm' ) ;

// Là je fais une fonction pour remettre la date dans le bon sens (jour/mois/annee)
function formaterDateFR(dateString) {
if (!dateString || dateString === 'N/A') {
return 'Non disponible' ;
} else {
let date = new Date(dateString) ;
let jour = date.getDate() ;
let mois = date.getMonth() + 1 ;
let annee = date.getFullYear() ;

// Si le jour ou le mois il est inferieur à 10, je rajoute un 0 devant
if (jour < 10) {
jour = '0' + jour ;
}

if (mois < 10) {
mois = '0' + mois ;
}

return `${jour}/${mois}/${annee}` ;
}
}

// Ma fonction pour charger et afficher toutes les infos du film
async function afficherDetails() {
// Là c'est si j'ai pas d'id, j'affiche un message et je m'arrete la
if (!idFilm) {
conteneurDetails.textContent = 'Aucun film sélectionné.' ;
return ;
}

// J'appelle du coup l'API pour avoir les données du film
let film = await obtenirDetailsFilm(idFilm) ;

if (!film || film.Response === 'False') {
conteneurDetails.textContent = 'Film introuvable.' ;
return ;
}

// C'est pour enlever le texte de chargement
conteneurDetails.textContent = '' ;

// Je fais l'image de l'affiche avec createElement
let img = document.createElement('img') ;
  
if (film.Poster !== 'N/A') {
img.src = film.Poster ;
} else {
img.src = 'https://via.placeholder.com/300x450?text=Pas+d+image' ;
}
img.alt = film.Title ;

// Je fais le titre principal avec l'annee avec createElement aussi
let h2 = document.createElement('h2') ;
h2.textContent = `${film.Title} (${film.Year})` ;

// Je fais tous les paragraphes d'informations avec textContent
let pGenre = document.createElement('p') ;
pGenre.textContent = `Genre : ${film.Genre}` ;

let pActeurs = document.createElement('p') ;
pActeurs.textContent = `Acteurs : ${film.Actors}` ;

let pResume = document.createElement('p') ;
pResume.textContent = `Résumé : ${film.Plot}` ;

let pNote = document.createElement('p') ;
pNote.textContent = `Note IMDb : ${film.imdbRating} / 10` ;

let pDVD = document.createElement('p') ;
pDVD.textContent = `Date de sortie DVD : ${formaterDateFR(film.DVD)}` ;

// J'ajoute tout dans la page avec mes appendChild
conteneurDetails.appendChild(img) ;
conteneurDetails.appendChild(h2) ;
conteneurDetails.appendChild(pGenre) ;
conteneurDetails.appendChild(pActeurs) ;
conteneurDetails.appendChild(pResume) ;
conteneurDetails.appendChild(pNote) ;
conteneurDetails.appendChild(pDVD) ;
}

// Là c'est pour lancer l'affichage directement au chargement de la page
afficherDetails() ;