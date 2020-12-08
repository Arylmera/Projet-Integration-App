/*
Définition des themes
 */
import {getDataStorage, storeDataStorage} from '../../functions/storageHelper';

const winterStyle = {
   primary: '#274c77',
   secondary: '#619fc8',
   accent: '#9ceaef',
   highlight: '#000000',
};
const autumnStyle = {
   primary: '#5e3023',
   secondary: '#895737',
   accent: '#c08552',
   highlight: '#f3e9dc',
};
const springStyle = {
   primary: '#B4FFB6',
   secondary: '#CFFFD0',
   accent: '#FFB5D6',
   highlight: '#000000',
};
const summerStyle = {
   primary: '#C0EBFC',
   secondary: '#DBF5FF',
   accent: '#FCE0C0',
   highlight: '#000000',
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
   let nextState = {};

   switch (action.type) {
      case 'SET_WINTER':
         nextState = {
            ...state,
            currentStyle: winterStyle,
         };
         storeDataStorage('theme_key', 'winterStyle').then(() => {});
         return nextState || state;
      case 'SET_AUTUMN':
         nextState = {
            ...state,
            currentStyle: autumnStyle,
         };
         storeDataStorage('theme_key', 'autumnStyle').then(() => {});
         return nextState || state;
      case 'SET_SPRING':
         nextState = {
            ...state,
            currentStyle: springStyle,
         };
         storeDataStorage('theme_key', 'springStyle').then(() => {});
         return nextState || state;
      case 'SET_SUMMER':
         nextState = {
            ...state,
            currentStyle: summerStyle,
         };
         storeDataStorage('theme_key', 'summerStyle').then(() => {});
         return nextState || state;
      default:
         nextState = {
            ...state,
            currentStyle: autumnStyle,
         };
         getDataStorage('theme_key').then((r) => {
            if (r !== null) {
               nextState = {
                  ...state,
                  currentStyle: r,
               };
               return nextState || state;
            }
         });
         return nextState || state;
   }
}

export default switchTheme;
