const wtf = require('wtf_wikipedia');

const url = 'https://fr.wikipedia.org/api/rest_v1/page/summary/';

/**
 * récupération des info de l api rest wikipedia
 * @param name
 * @return {Promise<any | void>}
 */
export function getWikiInfo(name) {
  return fetch(url + name)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

/**
 * récupération des info de WTFwikipedia
 * @param name
 * @return {Promise<T | void>}
 */
export function getWTFWikipedia(name) {
  return wtf
    .fetch(name, 'fr')
    .then((response) => response.json())
    .catch((error) => console.log(error));
}
