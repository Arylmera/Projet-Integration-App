const url = 'http://146.59.195.248:3000/v1/api/utilisateurs';

export function getUtilisateur(email) {
  return fetch(url + '?email=' + email)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function createUtilisateur(nom, prenom, email) {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nom: nom,
      prenom: prenom,
      email: email,
    }),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function updateUtilisateur(nom, prenom, email, id) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
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

export function deleteUtilisateur(id) {
  return fetch(url + '?id=' + id, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
