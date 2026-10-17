// J'importe ma fonction pour chercher les films à partir de l'API
import { chercherFilms } from './api.js' ;

// Je récupère les éléments de ma page de recherche
let form = document.getElementById('formulairerecherche') ;
let champ = document.getElementById('champrecherche') ;
let conteneurResultats = document.getElementById( 'resultatdelaRecherche' ) ;
let btnPlus = document.getElementById( 'buttonPlusDeResultats' ) ;

// Là je définis mes variables pour stocker la recherche et aussi la page
let rechercheActuelle = '' ;
let pageActuelle = 1 ;

// Là c'est pour empêcher la page de se recharger quand on valide le formulaire
form.addEventListener('submit' , function(event){
  event.preventDefault() ;
}) ;

// Quand j'écris dans la barre de recherche
champ.addEventListener('input' , async function(){
  rechercheActuelle = champ.value.trim() ; // Je nettoie les espaces en trop
  pageActuelle = 1 ; // Je remets la page a 1

  // Si j'ai tapé moins de 2 lettres, ça enlève tt
  if (rechercheActuelle.length < 2) {
    conteneurResultats.innerHTML = '' ;
    btnPlus.style.display = 'none' ;
    return ;
  }

  // Je lance la recherche sans garder les anciens films
  lancerRecherche(false) ;
}) ;

// Là c pour que quand je clique sur le bouton ça me permet de voir plus de films
btnPlus.addEventListener('click' , function(){
  pageActuelle++ ; // Je passe à la page d'après
  lancerRecherche(true) ; // Je rajoute la suite des films
}) ;

// Ma fonction principale pour chercher et afficher les films
async function lancerRecherche(ajouter) {

  // Si ajouter n'a pas été défini, je lui mets la valeur false
  if (!ajouter) {
    ajouter = false ;
  }

  let reponse = await chercherFilms(rechercheActuelle , pageActuelle) ;

  if (reponse && reponse.Response === 'True') {
    // Si c'est une nouvelle recherche, j'efface ce qu'il y avait avant
    if (!ajouter) {
      conteneurResultats.innerHTML = '' ;
    }

    // Je boucle sur chaque film trouve pour l'afficher
    reponse.Search.forEach((film) => {
      let div = document.createElement( 'div' ) ;
      div.className = 'detailsduFilm' ;

      let img = document.createElement('img') ;
      
      if (film.Poster !== 'N/A') {
        img.src = film.Poster ;
      } else {
        img.src = 'https://via.placeholder.com/200x300?text=Pas+d+image' ;
      }
      img.alt = film.Title ;

      let h3 = document.createElement('h3') ;
      h3.textContent = film.Title ;

      let p = document.createElement('p') ;
      p.textContent = film.Year ;

      // C'est pour aller sur la page de détail du film

      let lien = document.createElement('a') ;
      lien.href = `movie.html?id=${film.imdbID}` ;
      lien.textContent = 'En savoir plus' ;

      //C'est pour afficher tout ça dans la div
      div.appendChild(img) ;
      div.appendChild(h3) ;
      div.appendChild(p) ;
      div.appendChild(lien) ;

      conteneurResultats.appendChild(div) ;
    }) ;

    // J'affiche le bouton pour avoir plus de resultats
    btnPlus.style.display = 'block' ;
  } else if (!ajouter) {
    // Si j'ai rien trouve, j'ecris un message
    conteneurResultats.textContent = 'Aucun film trouvé.' ;
    btnPlus.style.display = 'none' ;
  }
}