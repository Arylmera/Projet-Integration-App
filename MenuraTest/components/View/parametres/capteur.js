'use strict'

import React from 'react';
import {
   Text,
   View,
   TouchableOpacity,
   FlatList,
   TextInput,
   SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CapteurItem from './capteurItem';
import firebase from 'firebase';
import {addCapteur, getCapteurListById} from '../../../api/capteur_api';
import {useNavigation} from '@react-navigation/core';

class Capteur extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         capteur_list: '',
         mac_add_capteur: '',
         mac_address_message: '',
         status_text: 'Aucun capteur lié',
      };
   }

   /**
    * au chargement du component
    */
   componentDidMount() {
      this._checkIfLoggedIn();
   }

   /**
    * check du login utilisateur et récupération des informations
    * @private
    */
   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this._load_capteur_list(user);
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   /**
    * récupération de la liste des capteur de l'utilisateur par la requete get
    * @param user
    */
   _load_capteur_list(user) {
      user.getIdToken(true).then((idToken) => {
         getCapteurListById(user.uid, idToken).then((data) =>
            this.setState({capteur_list: data.data}),
         );
      });
   }

   /**
    * helper textInput changement de la macAdresse
    * @param mac_adresse
    * @private
    */
   _mac_adresse_change(mac_adresse) {
      let newAddress = '';
      let len = mac_adresse.length;
      if (len === 2 || len === 5 || len === 8 || len === 11 || len === 14 && len > this.state.mac_add_capteur.length) {
         newAddress = mac_adresse + ':'
         this.setState({mac_add_capteur: newAddress});
      } else {
         this.setState({mac_add_capteur: mac_adresse});
      }
   }

   /**
    * ajout d'un capteur
    * vérification de la valeur de la mac adresse
    * envois par requete POST a la base de donnée
    * @private
    */
   _add_capteur() {
      let Mac_Regex = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
      const user = firebase.auth().currentUser;
      if (Mac_Regex.test(this.state.mac_add_capteur)) {
         user.getIdToken(true).then((idToken) => {
            addCapteur(user.uid, idToken, this.state.mac_add_capteur)
               .then(() => {
                  this.state.capteur_list.push({
                     macAddress: this.state.mac_add_capteur,
                     actif: 1,
                  });
               })
               .then(() => {
                  this.setState({mac_add_capteur: ''});
               })
               .catch((error) => {
                  console.log(error);
               });
         });
      } else {
         this.setState({
            mac_address_message: 'veuillez enter une mac adresse valide',
            mac_add_capteur: '',
         });
      }
   }

   /**
    * render
    * @return {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      return (
         <SafeAreaView style={{flex: 1}}>
            <View style={[styles.main_container]}>
               <View style={[styles.container_header]}>
                  <Text style={[styles.title, {color: theme.highlight}]}>
                     Liste de mes Capteurs
                  </Text>
                  <View
                     style={[
                        styles.add_capteur_container,
                        {
                           backgroundColor: theme.accent,
                           color: theme.highlight,
                        },
                     ]}>
                     <Text style={{color: theme.highlight}}>Adresse MAC :</Text>
                     <TextInput
                        placeholder="FF:FF:FF:FF:FF:FF"
                        autocorrect={false}
                        autoCapitalize={'characters'}
                        value={this.state.mac_add_capteur}
                        onChangeText={(mac_adresse) =>
                           this._mac_adresse_change(mac_adresse)
                        }
                        style={[
                           styles.add_capteur_input,
                           {
                              color: theme.highlight,
                              backgroundColor: theme.secondary,
                           },
                        ]}
                     />
                     <TouchableOpacity
                        onPress={() => {
                           this._add_capteur();
                        }}
                        style={[
                           styles.add_capteur_button,
                           {backgroundColor: theme.primary},
                        ]}>
                        <Icon
                           name="add"
                           size={18}
                           color={theme.accent}
                           style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                           }}
                        />
                     </TouchableOpacity>
                  </View>
                  <Text
                     style={[
                        styles.mac_address_message,
                        {color: theme.highlight},
                     ]}>
                     {this.state.mac_address_message}
                  </Text>
               </View>
               <Divider
                  style={[styles.divider, {backgroundColor: theme.highlight}]}
               />
               <View style={styles.capteur_list}>
                  {this.state.capteur_list.length > 0 ? (
                     <View>
                        <FlatList
                           data={this.state.capteur_list}
                           style={styles.FlatlistItem}
                           keyExtractor={(item) => item.id}
                           renderItem={({item}) => (
                              <CapteurItem
                                 data={{
                                    capteur: item,
                                 }}
                              />
                           )}
                        />
                     </View>
                  ) : (
                     <Text
                        style={[
                           styles.capteur_unknown,
                           {color: theme.highlight},
                        ]}>
                        {this.state.status_text}
                     </Text>
                  )}
               </View>
            </View>
         </SafeAreaView>
      );
   }
}
const styles = StyleSheet.create({
   main_container: {
      paddingTop: 10,
      flex: 1,
      minHeight: 200,
      flexDirection: 'column',
   },
   divider: {
      margin: 0,
      padding: 0,
   },
   container_header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 0,
   },
   title: {
      textAlign: 'center',
      fontSize: 20,
      marginBottom: 5,
   },
   mac_address_message: {
      margin: 3,
   },
   add_capteur_container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 5,
      marginBottom: 0,
      width: '90%',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
   },
   add_capteur_button: {
      padding: 2,
      borderRadius: 5,
   },
   add_capteur_input: {
      width: '50%',
      margin: 5,
      marginLeft: 10,
      marginRight: 10,
      padding: 5,
      borderRadius: 5,
      textAlign: 'center',
   },
   add_capteur_button_text: {
      textAlign: 'center',
   },
   capteur_list: {
      flex: 3,
      marginTop: 10,
      marginBottom: 10,
   },
   capteur_unknown: {
      flex: 1,
      textAlign: 'center',
   },
   FlatlistItem: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();

   return <Capteur {...props} navigation={navigation} />;
});
