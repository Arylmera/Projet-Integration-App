

import React from 'react';
import {
   StyleSheet,
   View,
   Text,
   Image,
   TouchableOpacity,
   ScrollView,
   Modal,
   TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {deleteUtilisateur} from '../../../api/utilisateurs_api';

class ProfilView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         prenom: 'User name',
         nom: 'User lastName',
         email: 'email',
         profileIcon: '',
         password: '',
         newPassword: '',
         updatePasswordModal: false,
         deconnexionModal: false,
         deleteAccountModal: false,
      };
   }

   componentDidMount() {
      this._checkIfLoggedIn();
   }

   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            let email = user.email;
            let uid = user.uid;
            let nom = user.displayName.split(' ')[0];
            let prenom = user.displayName.split(' ')[1];
            let avatar = user.photoURL;
            this.setState({email: email, nom: nom, prenom: prenom, id: uid, profileIcon: avatar});
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   _logOut() {
      firebase
         .auth()
         .signOut()
         .then(() => {})
         .catch((error) => {
            console.log(error);
         });
   }

   _passwordTextInputChanged(password) {
      this.setState({password: password});
   }

   _newPasswordTextInputChanged(newPassword) {
      this.setState({newPassword: newPassword});
   }

   _askDeleteAccount() {
      this.setState({deleteAccountModal: true});
   }
   _askDeconnexion() {
      this.setState({deconnexionModal: true});
   }

   _askUpdatePassword() {
      this.setState({updatePasswordModal: true});
   }

   _deleteAccount() {
      const user = firebase.auth().currentUser;
      const id = user.uid;
      const credential = firebase.auth.EmailAuthProvider.credential(
         user.email,
         this.state.password,
      );
      user.getIdToken(true).then((idToken) => {
         deleteUtilisateur(id, idToken).then((data) => {});
      });
      user
         .reauthenticateWithCredential(credential)
         .then(() => {})
         .catch((error) => console.log(error));
      user
         .delete()
         .then(() => {
            this.setState({deleteAccountModal: false});
            this.props.navigation.navigate('connexion');
         })
         .catch((error) => {
            console.log(error);
         });
   }

   _updatePassword() {
      const user = firebase.auth().currentUser;
      const credential = firebase.auth.EmailAuthProvider.credential(
         user.email,
         this.state.password,
      );
      user
         .reauthenticateWithCredential(credential)
         .then(() => {})
         .catch((error) => console.log(error));
      user
         .updatePassword(this.state.newPassword)
         .then(() => {
            this.setState({updatePasswordModal: false});
            this.props.navigation.navigate('modificationProfil');
         })
         .catch((error) => {
            console.log(error);
         });
   }

   render() {
      let theme = this.props.currentStyle;
      return (
         <ScrollView
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View style={styles.container_row}>
               <View style={styles.headerProfile}>
                  <Text style={[styles.nameStyle, {color: theme.highlight}]}>
                     {' '}
                     {this.state.prenom}{' '}
                  </Text>
                  <Text
                     style={[styles.lastNameStyle, {color: theme.highlight}]}>
                     {' '}
                     {this.state.nom}{' '}
                  </Text>
               </View>
               <TouchableOpacity
                   onPress={() => this.props.navigation.navigate('avatar')}
               >
               <Image
                  source={this.state.profileIcon}
                  style={[
                     styles.profileIcon,
                     {backgroundColor: theme.secondary},
                  ]}
               />
               </TouchableOpacity>
            </View>
            <View style={styles.container_row}>
               <View style={[styles.body_container]}>
                  <Text style={[styles.email, {color: theme.highlight}]}>
                     {this.state.email}
                  </Text>
               </View>
            </View>
            <View style={[styles.container_row, styles.button_container]}>
               <TouchableOpacity
                  style={[styles.button, {backgroundColor: theme.secondary}]}
                  onPress={() => this._askUpdatePassword()}>
                  <Text style={{color: theme.highlight}}>
                     modifier le mot de passe
                  </Text>
               </TouchableOpacity>

               //Modal changement de mot de passe
               <Modal visible={this.state.updatePasswordModal}>
                  <ScrollView
                     style={[
                        styles.update_password_view,
                        {backgroundColor: theme.primary},
                     ]}>
                     <Text
                        style={[
                           styles.text,
                           {color: theme.highlight, fontSize: 18},
                        ]}>
                        Mot de passe actuel:
                     </Text>
                     <TextInput
                        style={[styles.textinput, {marginTop: 20}]}
                        placeholder="mot de passe actuel"
                        placeholderTextColor={theme.highlight}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        onChangeText={(password) =>
                           this._passwordTextInputChanged(password)
                        }
                     />
                     <Text
                        style={[
                           styles.text,
                           {color: theme.highlight, fontSize: 18},
                        ]}>
                        Nouveau mot de passe:
                     </Text>
                     <TextInput
                        style={[styles.textinput, {marginTop: 20}]}
                        placeholder="nouveau mot de passe"
                        placeholderTextColor={theme.highlight}
                        autoCapitalize={'none'}
                        onChangeText={(newPassword) =>
                           this._newPasswordTextInputChanged(newPassword)
                        }
                     />
                     <View styles={styles.modif_password_button_bloc}>
                        <TouchableOpacity
                           style={[
                              styles.button,
                              styles.modif_button,
                              {backgroundColor: theme.accent, marginTop: 50},
                           ]}
                           onPress={() => this._updatePassword()}>
                           <Text style={{color: theme.highlight}}>
                              Confirmer
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={[
                              styles.button,
                              styles.modif_button,
                              {backgroundColor: theme.secondary},
                           ]}
                           onPress={() =>
                              this.setState({updatePasswordModal: false})
                           }>
                           <Text style={{color: theme.highlight}}>Annuler</Text>
                        </TouchableOpacity>
                     </View>
                  </ScrollView>

                  //Modal de déconnexion
               </Modal>
               <TouchableOpacity
                  style={[styles.button, {backgroundColor: theme.secondary}]}
                  onPress={() => this._askDeconnexion()}>
                  <Text style={{color: theme.highlight}}>déconnexion</Text>
               </TouchableOpacity>
               <Modal visible={this.state.deconnexionModal}>
                  <ScrollView
                     style={[
                        styles.deconnection_view,
                        {backgroundColor: theme.primary},
                     ]}>
                     <Text
                        style={[
                           styles.text,
                           {
                              color: theme.highlight,
                              fontSize: 18,
                              justifyContent: 'center',
                           },
                        ]}>
                        Voulez vous vraiment vous déconnecter ?
                     </Text>
                     <View style={[styles.deconnection_button_bloc]}>
                        <TouchableOpacity
                           style={[
                              styles.button,
                              styles.deconnection_button,
                              {backgroundColor: '#de0404'},
                           ]}
                           onPress={() => this._logOut()}>
                           <Text style={{color: 'white'}}>Se déconnecter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={[
                              styles.button,
                              styles.deconnection_button,
                              {backgroundColor: theme.secondary},
                           ]}
                           onPress={() =>
                              this.setState({deconnexionModal: false})
                           }>
                           <Text style={{color: theme.highlight}}>Annuler</Text>
                        </TouchableOpacity>
                     </View>
                  </ScrollView>

                  //Modal de supression de compte
               </Modal>
               <TouchableOpacity
                  style={[styles.button, {backgroundColor: theme.secondary}]}
                  onPress={() => this._askDeleteAccount()}>
                  <Text style={{color: theme.highlight}}>supprimer compte</Text>
               </TouchableOpacity>
               <Modal visible={this.state.deleteAccountModal}>
                  <ScrollView
                     style={[
                        styles.delete_acount_view,
                        {backgroundColor: theme.primary},
                     ]}>
                     <Text
                        style={[
                           styles.text,
                           {color: theme.highlight, fontSize: 22},
                        ]}>
                        Attention cette action supprime définitivement votre
                        compte et vous ne pourrez plus récupérer vos données !
                     </Text>
                     <Text
                        style={[
                           styles.text,
                           {color: theme.highlight, fontSize: 18},
                        ]}>
                        Pour continuer, entrez votre mot de passe :
                     </Text>
                     <TextInput
                        style={[styles.textinput, {marginTop: 20}]}
                        placeholder="mot de passe"
                        placeholderTextColor={theme.highlight}
                        secureTextEntry={true}
                        autoCapitalize={'none'}
                        onChangeText={(password) =>
                           this._passwordTextInputChanged(password)
                        }
                     />
                     <View style={[styles.delete_acount_button_bloc]}>
                        <TouchableOpacity
                           style={[styles.button, {backgroundColor: '#de0404'}]}
                           onPress={() => this._deleteAccount()}>
                           <Text style={{color: 'white'}}>
                              Supprimer mon compte
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           style={[
                              styles.button,
                              {backgroundColor: theme.secondary},
                           ]}
                           onPress={() =>
                              this.setState({deleteAccountModal: false})
                           }>
                           <Text style={{color: theme.highlight}}>Annuler</Text>
                        </TouchableOpacity>
                     </View>
                  </ScrollView>
               </Modal>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
   },
   container_row: {
      margin: 10,
      padding: 5,
      flexDirection: 'row',
      alignContent: 'space-between',
   },
   body_container: {
      flex: 1,
      flexDirection: 'column',
   },
   body_info: {
      flex: 1,
   },
   body_footer: {
      flex: 1,
   },
   headerProfile: {
      flex: 1,
      justifyContent: 'center',
   },
   nameStyle: {
      marginRight: 'auto',
      fontSize: 25,
      fontWeight: 'bold',
   },
   lastNameStyle: {
      marginTop: 5,
      marginRight: 'auto',
      fontSize: 20,
   },
   profileIcon: {
      flex: 1,
      marginTop: 20,
      borderRadius: 100,
      width: 150,
      height: 150,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
   },
   button_container: {
      flex: 1,
      flexDirection: 'column',
      marginRight: 5,
   },
   button: {
      flex: 1,
      padding: 5,
      margin: 5,
      marginLeft: 'auto',
      borderRadius: 4,
      width: '50%',
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
   },
   textinput: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      paddingLeft: 10,
   },
   text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 40,
   },
   email: {},
   update_password_view: {
      padding: 20,
      paddingTop: 30,
   },
   modif_password_button_bloc: {
      width: '100%',
      flexDirection: 'column',
   },
   modif_button: {
      flex: 1,
   },
   deconnection_view: {
      padding: 20,
      paddingTop: 30,
   },
   deconnection_button_bloc: {
      width: '100%',
      flexDirection: 'column',
      marginTop: 50,
   },
   deconnection_button: {
      flex: 1,
   },
   delete_acount_view: {
      padding: 20,
      paddingTop: 30,
   },
   delete_acount_button_bloc: {
      width: '100%',
      flexDirection: 'column',
      marginTop: 50,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();

   return <ProfilView {...props} navigation={navigation} />;
});
