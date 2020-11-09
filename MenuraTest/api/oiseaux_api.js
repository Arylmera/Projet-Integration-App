const url_getOiseaux = 'http://146.59.195.248:3000/v1/api/oiseaux?recherche=';

const url_historique_byID = 'http://146.59.195.248:3000/v1/historiques?id=';

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
 * @param id
 * @return {Promise<Response | void>}
 */
export function getHistoriqueByID(id) {
  return fetch(url_historique_byID + id)
    .then((response) => response)
    .catch((error) => console.log(error));
}
