/*
Définition des themes
 */
import {getDataStorage, storeDataStorage} from '../../functions/storageHelper';

const winterStyle = {
  primary: '#FFFFFF',
  secondary: '#E7F6F5',
  accent: '#C3E7E7',
  highlight: '#272343',
};
const autumnStyle = {
  primary: '#FAE1AC',
  secondary: '#D58647',
  accent: '#c16a4f',
  highlight: '#622B35',
};
const springStyle = {
  primary: '#B5E4D0',
  secondary: '#DFECC5',
  accent: '#e4dfb5',
  highlight: '#F3AEA8',
};
const summerStyle = {
  primary: '#87DFD6',
  secondary: '#01c3cf',
  accent: '#FBFD8A',
  highlight: '#086972',
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
          console.log('Theme : ' + r + ' from the localStorage (AsyncStorage)');
          return nextState || state;
        }
      });
      console.log('set default theme || switch default not in localStorage');
      return nextState || state;
  }
}

export default switchTheme;
