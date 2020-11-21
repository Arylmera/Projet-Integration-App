const url = 'http://146.59.195.248:3000/v1/api/utilisateurs';

export function getUtilisateur(id, idToken) {
   return fetch(url + '?id=' + id, {
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
}

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

export function updateUtilisateur(nom, prenom, email, id, idToken) {
   return fetch(url, {
      method: 'PUT',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + idToken,
      },
      body: JSON.stringify({
         nom: nom,
         prenom: prenom,
         email: email,
         id: id,
      }),
   })
      .then((response) => response.json())
      .catch((error) => console.log(error));
}

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
