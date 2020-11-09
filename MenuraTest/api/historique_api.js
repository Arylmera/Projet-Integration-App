const url_historique_byID = 'http://146.59.195.248:3000/v1/historiques?id=';

/**
 *
 * @param id
 * @return {Promise<Response | void>}
 */
export function getHistoriqueByID(id, idToken) {
  return fetch(url_historique_byID + id, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + idToken,
    },
  })
    .then((response) => response)
    .catch((error) => console.log(error));
}
