import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HeaderNavigator from './components/Navigation/HeaderNavigator';
import {Provider} from 'react-redux';
import Store from './Store/configureStore';
import firebase from 'firebase';
import {firebaseConfig} from './config';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(true);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   /**
    * render
    * @returns {JSX.Element}
    */
   render() {
      return (
         <Provider store={Store}>
            <NavigationContainer style={styles.main_container}>
               <HeaderNavigator />
            </NavigationContainer>
         </Provider>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
   },
});

export default App;
