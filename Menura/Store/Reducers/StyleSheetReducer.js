import ls from "local-storage";

/*
Définition des themes
 */
const winterStyle = {
    primary: "#FFFFFF",
    secondary: "#E7F6F5",
    accent: "#C3E7E7",
    highlight: "#272343"
};
const autumnStyle = {
    primary: "#FAE1AC",
    secondary: "#D58647",
    accent: "#8A3F3C",
    highlight: "#622B35"
};
const springStyle = {
    primary: "#B5E4D0",
    secondary: "#DFECC5",
    accent: "#e4dfb5",
    highlight: "#F3AEA8"
};
const summerStyle = {
    primary: "#87DFD6",
    secondary: "#FBFD8A",
    accent: "#01A9B4",
    highlight: "#086972"
};
const darkStyle = {
    primary: "#868686",
    secondary: "#5b5b5b",
    accent: "#000000",
    highlight: "#ffffff"
};

/*
variable de theme courant
 */
let currentStyle = {};

/**
 * fonction changement de theme
 * @param state
 * @param action
 * @return {{currentStyle: {secondary: string, highlight: string, accent: string, primary: string}}|{}|{currentStyle: {secondary: string, highlight: string, accent: string, primary: string}}}
 */
function switchTheme(state = currentStyle, action) {
    let nextState = winterStyle;

    switch(action.type) {
        case 'SET_WINTER' :
            nextState = {
                ...state,
                currentStyle: winterStyle
            };
            ls.set("theme_key", "winterStyle");
            return nextState || state
        case 'SET_AUTUMN' :
            nextState = {
                ...state,
                currentStyle: autumnStyle
            };
            ls.set("theme_key", "autumnStyle");
            return nextState || state
        case 'SET_SPRING' :
            nextState = {
                ...state,
                currentStyle: springStyle
            };
            ls.set("theme_key", "springStyle");
            return nextState || state
        case 'SET_SUMMER' :
            nextState = {
                ...state,
                currentStyle: summerStyle
            };
            ls.set("theme_key", "summerStyle");
            return nextState || state
        case 'SET_DARK' :
            nextState = {
                ...state,
                currentStyle: darkStyle
            }
            ls.set("theme_key", "darkStyle");
            return nextState || state
        default:
            if (ls.get("theme_key")){
                return  {...state, currentStyle: ls.get("theme_key")};
            }
            return  {...state, currentStyle: winterStyle}
    }
}

export default switchTheme
