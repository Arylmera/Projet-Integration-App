/*
Définition des themes
 */
import {getDataStorage, storeDataStorage} from '../../functions/storageHelper';

const winterStyle = {
  primary: '#272343',
  secondary: '#383656',
  accent: '#474177',
  highlight: '#FFFFFF',
};
const autumnStyle = {
  primary: '#622B35',
  secondary: '#5d3039',
  accent: '#9f4757',
  highlight: '#FAE1AC',
};
const springStyle = {
  primary: '#c6746b',
  secondary: '#d48f89',
  accent: '#F3AEA8',
  highlight: '#B5E4D0',
};
const summerStyle = {
  primary: '#086972',
  secondary: '#0e646d',
  accent: '#0e919d',
  highlight: '#e1e382',
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
