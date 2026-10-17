// Je mets la clé API que j'ai reçu par mail et l'adresse du site OMDb dans des variables
const API_KEY = 'c6a03a65' ;
const BASE_URL = 'https://www.omdbapi.com/' ;

// Ma fonction pour chercher des films avec un mot, une page et l'année
async function chercherFilms( recherche , page = 1 , annee = '' ) {
  try {

    // Je prépare l'adresse web avec le mot recherche et la page
let url = `${BASE_URL}?apikey=${API_KEY}&s=${recherche}&page=${page}` ;

    // Si y a l'année , je la rajoute au bout de l'adresse
    if (annee) {
      url += `&y=${annee}` ;
    }

    // Je fais un fetch pour aller récupérer les filsm 
    let response = await fetch(url) ;
    
    // Je convertis la réponse en objet qu'on peut utiliser
    let data = await response.json() ;

    // Je renvoie le résultat
    return data ;
  } catch(erreur) {

    // Si ca marche pas, j'affiche l'erreur dans la console
    console.error(erreur) ;
  }
}

// là c'est pour récupérer les infos d'un  film avec son id
async function obtenirDetailsFilm( id ) {
  try {

    // Je définit ma variable avec l'adresse et l'id du film
    let url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full` ;

    // Je fais un fetch pour appeler l'API
    let response = await fetch(url) ;
    let data = await response.json() ;

    return data ;
  } catch(erreur) {
    console.error(erreur) ;
  }
}

// Là c'est pour exporter les 2 fonctions pour les utiliser dans les autres fichiers
export { chercherFilms , obtenirDetailsFilm } ;

