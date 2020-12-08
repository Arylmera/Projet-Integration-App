const url = 'https://menura.be:3000/v1/api/utilisateurs';

/**
 * requête de création d'un nouvel utilisateur
 * @param id
 * @param nom
 * @param prenom
 * @param email
 * @param idToken
 * @returns {Promise<any | void>}
 */
export function createUtilisateur(id, nom, prenom, email, idToken) {
   return fetch(url, {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
      body: JSON.stringify({
         id: id,
         nom: nom,
         prenom: prenom,
         email: email,
      }),
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
}

/**
 * requête de suppression d'un utilisateur
 * @param id
 * @param idToken
 * @returns {Promise<any | void>}
 */
export function deleteUtilisateur(id, idToken) {
   return fetch(url + '?id=' + id, {
      method: 'DELETE',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
}
