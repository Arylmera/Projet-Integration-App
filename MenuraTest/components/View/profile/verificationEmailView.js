

import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import firebase from 'firebase';

class ConnexionProfilView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         prenom: '',
         infoText: '',
      };
   }

   componentDidMount() {
      this._checkIfLoggedIn();
   }

   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({prenom: user.displayName.split(' ')[1]});
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   _reenvoyerConfirmation() {
      firebase.auth().onAuthStateChanged((user) => {
         let prenom = user.displayName.split(' ')[1];
         user
            .sendEmailVerification()
            .then(() => {
               this.setState({
                  infoText: 'Un nouveau lien a été envoyé !',
                  prenom: prenom,
               });
            })
            .catch((error) => {
               console.log(error);
            });
      });
   }

   render() {
      return (
         <View style={styles.main_container}>
            <View style={styles.text_container}>
               <Text style={styles.textBienvenue}>
                  ** Bienvenue sur Menura {this.state.prenom} **
               </Text>
            </View>
            <View style={styles.text_container}>
               <Text style={styles.textExplication}>
                  Un email vous a été envoyé pour vérifier votre adresse email,
                  veuillez valider l'adresse et relancer l'application.
               </Text>
            </View>
            <View style={styles.text_container}>
               <Text>
                  Si vous désirez un nouveau lien de confirmation appuyer sur le
                  bouton
               </Text>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._reenvoyerConfirmation()}>
                  <Text>nouveau lien</Text>
               </TouchableOpacity>
            </View>
            <View>
               <Text style={styles.textInfo}>{this.state.infoText}</Text>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
      paddingTop: 5,
      alignItems: 'center',
   },
   text_container: {
      paddingTop: 25,
      marginLeft: 10,
      marginRight: 10,
   },
   button: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#166691',
      backgroundColor: '#add7ed',
      width: '50%',
      padding: 3,
      alignItems: 'center',
   },
   textBienvenue: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#166691',
   },
   textExplication: {
      fontSize: 18,
   },
   textInfo: {
      fontSize: 18,
      fontWeight: 'bold',
   },
});

export default (function (props) {
   const navigation = useNavigation();

   return <ConnexionProfilView {...props} navigation={navigation} />;
});
