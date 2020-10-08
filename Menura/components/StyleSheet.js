import {StyleSheet} from "react-native"

const winterStyle = StyleSheet.create({
    primary: {

    },
    secondary: {

    },
    accent: {

    },
    highlight: {

    }
});

const autumnStyle = StyleSheet.create({
    primary: {
        backgroundColor: "rgb(250,225,172)",
        color: "rgb(213,134,71)"
    },
    secondary: {
        backgroundColor: "rgb(213,134,71)",
        color: "rgb(138,63,60)"
    },
    accent: {
        backgroundColor: "rgb(138,63,60)",
        color: "rgb(250,225,172)"
    },
    highlight: {
        backgroundColor: "rgb(138,63,60)",
        color: "rgb(250,225,172)"
    }
});

const springStyle = StyleSheet.create({
    primary: {

    },
    secondary: {

    },
    accent: {

    },
    highlight: {

    }
});

const summerStyle = StyleSheet.create({
    primary: {

    },
    secondary: {

    },
    accent: {

    },
    highlight: {

    }
});

export function getThemeColor() {
    switch(currentTheme){
        case 'winter':
            return "rgb(138,63,60)"
            break;

        case 'autumn':
            return "rgb(138,63,60)"
            break;

        case 'spring':
            return "rgb(138,63,60)"
            break;

        case 'summer':
            return "rgb(138,63,60)"
            break;

        default:
            return "rgb(138,63,60)"
            break;
    }
}


let seasonStyle = autumnStyle;
let currentTheme = 'autumn';

export function getStyleSheet(){
    return seasonStyle;
}

export default function setUpStyleSheet(theme) {
    switch(theme){
        case 'winter':
            seasonStyle = winterStyle;
            currentTheme = 'winter';
            break;

        case 'autumn':
            seasonStyle =  autumnStyle;
            currentTheme = 'autumn';
            break;

        case 'spring':
            seasonStyle = springStyle;
            currentTheme = 'spring';
            break;

        case 'summer':
            seasonStyle = summerStyle;
            currentTheme = 'summer';
            break;

        default:
            seasonStyle = autumnStyle;
            currentTheme = 'autumn';
            break;
    }
}

