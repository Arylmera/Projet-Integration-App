const url_getOiseaux = 'https://menura.be:3000/v1/api/oiseaux?recherche=';

/**
 * requête retournant les oiseaux en fonction d'un texte de recherche
 * @param text
 * @returns {Promise<any | void>}
 */
export function getOiseaux(text) {
   return fetch(url_getOiseaux + text)
      .then((response) => response.json())
      .catch((error) => console.log(error));
}
