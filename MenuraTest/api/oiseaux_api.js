const url_getOiseaux = 'http://146.59.195.248:3000/v1/api/oiseaux?recherche=';
const url_addOiseaux = 'http://146.59.195.248:3000/v1/api/historiques';

/**
 *
 * @param text
 * @returns {Promise<any | void>}
 */
export function getOiseaux(text) {
   return fetch(url_getOiseaux + text)
      .then((response) => response.json())
      .catch((error) => console.log(error));
}

/**
 *
 * @returns {Promise<any | void>}
 * @param id
 * @param idToken
 * @param oiseau
 */
export async function addOiseaux(id, idToken, oiseau) {
   return fetch(url_addOiseaux, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
      body: JSON.stringify({
         oiseau: oiseau.nom,
         date: oiseau.date,
         localisation: oiseau.localisation,
         capteur: oiseau.capteur,
      }),
   })
      .then(() => console.log('Oiseau added'))
      .catch((error) => console.log(error));
}
