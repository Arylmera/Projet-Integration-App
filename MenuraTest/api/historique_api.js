const url_historique_byID =
   'https://146.59.195.248:3000/v1/api/historiques?utilisateur=';

const url_historique_all = 'https://146.59.195.248:3000/v1/api/historiques/all';

/**
 *
 * @return {Promise<Response | void>}
 * @param utilisateur
 * @param idToken
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

export function getHistoriqueAll() {
   return fetch(url_historique_all, {
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
}
