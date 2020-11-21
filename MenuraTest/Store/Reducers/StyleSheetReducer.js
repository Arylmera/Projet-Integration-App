/*
Définition des themes
 */
import {getDataStorage, storeDataStorage} from '../../functions/storageHelper';

const winterStyle = {
   primary: '#004c8c',
   secondary: '#0277bd',
   accent: '#58a5f0',
   highlight: '#FFFFFF',
};
const autumnStyle = {
   primary: '#bb4d00',
   secondary: '#f57c00',
   accent: '#ffad42',
   highlight: '#000000',
};
const springStyle = {
   primary: '#bf5f82',
   secondary: '#f48fb1',
   accent: '#ffc1e3',
   highlight: '#000000',
};
const summerStyle = {
   primary: '#6b9b37',
   secondary: '#9ccc65',
   accent: '#cfff95',
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
         storeDataStorage('theme_key', 'winterStyle').then((r) => {
            console.log('theme saved');
         });
         return nextState || state;
      case 'SET_AUTUMN':
         nextState = {
            ...state,
            currentStyle: autumnStyle,
         };
         storeDataStorage('theme_key', 'autumnStyle').then((r) => {
            console.log('theme saved');
         });
         return nextState || state;
      case 'SET_SPRING':
         nextState = {
            ...state,
            currentStyle: springStyle,
         };
         storeDataStorage('theme_key', 'springStyle').then((r) => {
            console.log('theme saved');
         });
         return nextState || state;
      case 'SET_SUMMER':
         nextState = {
            ...state,
            currentStyle: summerStyle,
         };
         storeDataStorage('theme_key', 'summerStyle').then((r) => {
            console.log('theme saved');
         });
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
               console.log(
                  'Theme : ' + r + ' from the localStorage (AsyncStorage)',
               );
               return nextState || state;
            }
         });
         console.log('set default theme || switch default not in localStorage');
         return nextState || state;
   }
}

export default switchTheme;
