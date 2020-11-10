const url_historique_byID =
  'http://146.59.195.248:3000/v1/api/historiques?utilisateur=';

/**
 *
 * @param id
 * @return {Promise<Response | void>}
 */
export function getHistoriqueByID(utilisateur, idToken) {
  return fetch(url_historique_byID + utilisateur, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken,
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
