import {StyleSheet} from 'react-native';

const winterStyle = StyleSheet.create({
  primary: {
    backgroundColor: '#FFFFFF',
    color: '#272343',
  },
  secondary: {
    backgroundColor: '#E3F6F5',
    color: '#272343',
  },
  accent: {
    backgroundColor: '#BAE8E8',
    color: '#272343',
  },
  highlight: {
    backgroundColor: '#272343',
    color: '#FFFFFF',
  },
});

const autumnStyle = StyleSheet.create({
  primary: {
    backgroundColor: '#FAE1AC',
    color: '#8A3F3C',
  },
  secondary: {
    backgroundColor: '#D58647',
    color: '#8A3F3C',
  },
  accent: {
    backgroundColor: '#D58647',
    color: '#622B35',
  },
  highlight: {
    backgroundColor: '#622B35',
    color: '#FAE1AC',
  },
});

const springStyle = StyleSheet.create({
  primary: {
    backgroundColor: '#B5E4D0',
    color: '#F3AEA8',
  },
  secondary: {
    backgroundColor: '#DFECC5',
    color: '#F3AEA8',
  },
  accent: {
    backgroundColor: '#F3AEA8',
    color: '#DFECC5',
  },
  highlight: {
    backgroundColor: '#B5E4D0',
    color: '#F3AEA8',
  },
});

const summerStyle = StyleSheet.create({
  primary: {
    backgroundColor: '#87DFD6',
    color: '#086972',
  },
  secondary: {
    backgroundColor: '#01A9B4',
    color: '#086972',
  },
  accent: {
    backgroundColor: '#FBFD8A',
    color: '#086972',
  },
  highlight: {
    backgroundColor: '#086972',
    color: '#87DFD6',
  },
});

export function getThemePrimary() {
  switch (currentTheme) {
    case 'winter':
      return '#FFFFFF';
      break;

    case 'autumn':
      return '#FAE1AC';
      break;

    case 'spring':
      return '#B5E4D0';
      break;

    case 'summer':
      return '#87DFD6';
      break;

    default:
      return '#FAE1AC';
      break;
  }
}

export function getThemeSecondary() {
  switch (currentTheme) {
    case 'winter':
      return '#E3F6F5';
      break;

    case 'autumn':
      return '#D58647';
      break;

    case 'spring':
      return '#F8D5BA';
      break;

    case 'summer':
      return '#01A9B4';
      break;

    default:
      return '#D58647';
      break;
  }
}

export function getThemeAccent() {
  switch (currentTheme) {
    case 'winter':
      return '#BAE8E8';
      break;

    case 'autumn':
      return '#8A3F3C';
      break;
    case 'spring':
      return '#eccec5';
      break;

    case 'summer':
      return '#FBFD8A';
      break;

    default:
      return '#8A3F3C';
      break;
  }
}

export function getThemeHigLight() {
  switch (currentTheme) {
    case 'winter':
      return '#272343';
      break;

    case 'autumn':
      return '#622B35';
      break;

    case 'spring':
      return '#F3AEA8';
      break;

    case 'summer':
      return '#086972';
      break;

    default:
      return '#8A3F3C';
      break;
  }
}

let seasonStyle = autumnStyle;
let currentTheme = 'autumn';

export function getCurrentTheme() {
  return currentTheme;
}

export function getStyleSheet() {
  return seasonStyle;
}

export function getThemeTestHigliht(theme) {
  console.log('test highlight ' + theme);
  switch (theme) {
    case 'winter':
      return '#272343';
      break;

    case 'autumn':
      return '#622B35';
      break;

    case 'spring':
      return '#F3AEA8';
      break;

    case 'summer':
      return '#086972';
      break;

    default:
      return '#8A3F3C';
      break;
  }
}

export default function setUpStyleSheet(theme) {
  switch (theme) {
    case 'winter':
      seasonStyle = winterStyle;
      currentTheme = 'winter';
      break;

    case 'autumn':
      seasonStyle = autumnStyle;
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
