

import React from 'react';
import {
   ImageBackground,
   View,
   ActivityIndicator,
   StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/core';

class LoadingScreen extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   componentDidMount() {
      this._checkIfLoggedIn();
   }

   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user && user.emailVerified) {
            this.props.navigation.navigate('Views');
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   render() {
      return (
         <View style={styles.main_container}>
            <ImageBackground
               style={styles.image}
               resizeMode="center"
               source={require('../../assets/images/searchImage.png')}>
               <ActivityIndicator
                  style={styles.loading}
                  size="large"
                  color="#0b4200"
               />
            </ImageBackground>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
      padding: 0,
      backgroundColor: '#FFFFFF',
   },
   loading: {
      marginTop: 150,
   },
   image: {
      flex: 1,
      resizeMode: 'cover',
      height: '100%',
      width: '105%',
   },
});

export default function (props) {
   const navigation = useNavigation();

   return <LoadingScreen {...props} navigation={navigation} />;
}
