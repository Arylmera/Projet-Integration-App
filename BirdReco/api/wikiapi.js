const url = "https://fr.wikipedia.org/api/rest_v1/page/summary/"

export function getWikiInfo(name){
    return fetch(url + name )
        .then((response) => response.json())
        .catch((error) => console.log(error))
}