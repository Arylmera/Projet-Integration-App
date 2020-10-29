const url_getOiseauxList =
  'http://146.59.195.248:3000/v1/api/oiseaux?recherche=';

/**
 *
 * @param text
 * @returns {Promise<any | void>}
 */
export function getOiseauxListWithSearchedText(text) {
  return fetch(url_getOiseauxList + text)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
