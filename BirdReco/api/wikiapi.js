const url = "https://fr.wikipedia.org/api/rest_v1/page/summary/"
const urlSandBox = "https://fr.wikipedia.org/w/api.php?action=parse&format=json&prop=text|categories|images|sections|wikitext&formatversion=2&page="

export function getWikiInfo(name){
    return fetch(url + name )
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getWikiSandBox(name){
    return fetch(urlSandBox + name)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}
