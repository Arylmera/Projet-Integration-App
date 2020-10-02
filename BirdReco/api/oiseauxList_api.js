
const url_getOiseauxList = "";

export function getOiseauxListWithSearchedText (text) {

    function onerror(error){
        console.log(error);
        for(let i=0; i<data.length; i++){
            if(data[i].name === text){
                return data[i]
            }
        }
    }

    return fetch( url_getOiseauxList + text )
        .then((response) => response.json())
        .catch((error) => onerror(error) )


}
const data  = [
    {
        id: 1,
        name: "Mésange",
        description: "Les mésanges sont des passereaux, pour la plupart de la famille des Paridés"
    },
    {
        id: 2,
        name: "Pic vert",
        description: "Le Pic vert, aussi connu sous le nom Pivert, est une espèce d'oiseaux appartenant à la famille des Picidae."
    }
]

