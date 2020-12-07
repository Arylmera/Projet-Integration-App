const url_historique_byID =
   'https://menura.be:3000/v1/api/historiques?utilisateur=';

/**
 * requête retournant l'historique d'un utilisateur
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
