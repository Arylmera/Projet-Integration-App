
const url_getOiseauxList = "";

/**
 *
 * @param text
 * @returns {[]}
 */
export function getOiseauxListWithSearchedText(text) {

    let tab = [];
    for(let i=0; i<oiseau.length; i++){
        if(oiseau[i].toLowerCase().includes(text.toLowerCase())){
            tab.push(oiseau[i])
        }
    }
    return tab




}

const oiseau  = [ "Mésange", "Mésange bleu", "Mésange verte", "Pic vert","Moineau","Bergeronnette grise","Buse variable","Chardonneret élégant","Bruant Jaune","Paridae", "Merle"]


/*
export function getOiseauxListWithSearchedText (text) {

    function onerror(error){
        console.log(error);
        for(let i=0; i<data.length; i++){
            if(data[i].name === text){
                return JSON.stringify(data[i])
            }
        }
    }

    return fetch( url_getOiseauxList + text )
        .then((response) => response.json())
        .catch((error) => onerror(error) )


}


export function getOiseauxListWithSearchedText(text){
    return fetch(url_getOiseauxList + text )
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

 */