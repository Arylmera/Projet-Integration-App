const url_capteur_byID =
   'https://146.59.195.248:3000/v1/api/capteurs?utilisateur=';
const url_capteur_add = 'https://146.59.195.248:3000/v1/api/capteurs';
const url_capteur_delete_byID =
   'https://146.59.195.248:3000/v1/api/capteurs?macAddress=';

/**
 *
 * @param id
 * @return {Promise<Response | void>}
 */
export function getCapteurListById(id, idToken) {
   return fetch(url_capteur_byID + id, {
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
}

/**
 *
 * @param id
 * @param idToken
 * @param capteur_adresse
 * @return {Promise<void>}
 */
export async function addCapteur(id, idToken, capteur_adresse) {
   return fetch(url_capteur_add, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
      body: JSON.stringify({
         macAddress: capteur_adresse,
         utilisateur: id,
      }),
   })
      .then(() => console.log('Capteur added'))
      .catch((error) => console.log(error));
}

/**
 *
 * @param idToken
 * @param capteur_adresse
 * @return {Promise<void>}
 */
export async function deleteCapteur(idToken, capteur_adresse) {
   return fetch(url_capteur_delete_byID + capteur_adresse, {
      method: 'DELETE',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
   })
      .then((response) => console.log(response.json()))
      .catch((error) => console.log(error));
}
