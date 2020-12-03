import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {deleteCapteur, updateCapteur} from '../api/capteur_api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from 'firebase';
import {useNavigation} from '@react-navigation/core';

class CapteurItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         etat: 'actif',
         etatIcon: 'check',
         etatColor: 'green',
      };
   }

   componentDidMount() {
      this._checkEtat();
   }

   _checkEtat() {
      if (this.props.data.capteur.actif === 1) {
         this.setState({etat: 'actif', etatIcon: 'check', etatColor: 'green'});
      } else {
         this.setState({etat: 'inactif', etatIcon: 'close', etatColor: 'red'});
      }
   }

   /**
    * suppression du capteur dans la db par requete POST
    * @private
    */
   _modif_capteur() {
      const user = firebase.auth().currentUser;
      if (this.state.etat === 'actif') {
         user.getIdToken(true).then((idToken) => {
            deleteCapteur(idToken, this.props.data.capteur.macAddress).then(
               () => {
                  this.setState({
                     etat: 'inactif',
                     etatIcon: 'close',
                     etatColor: 'red',
                  });
               },
            );
         });
      } else {
         user.getIdToken(true).then((idToken) => {
            updateCapteur(idToken, this.props.data.capteur.macAddress).then(
               () => {
                  this.setState({
                     etat: 'actif',
                     etatIcon: 'check',
                     etatColor: 'green',
                  });
               },
            );
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
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View style={[styles.capteur_id]}>
               <Text style={[styles.capteur_id_text, {color: theme.highlight}]}>
                  Capteur
               </Text>
               <Text
                  style={[styles.capteur_id_adresse, {color: theme.highlight}]}>
                  {this.props.data.capteur.macAddress}
               </Text>
            </View>
            <TouchableOpacity
               onPress={() => {
                  this._modif_capteur();
               }}
               style={[styles.deleteButton, {backgroundColor: theme.accent}]}>
               <View style={styles.delete}>
                  <Text
                     style={[
                        styles.capteur_delete_text,
                        {color: theme.highlight},
                     ]}>
                     {this.state.etat}
                  </Text>
                  <Icon
                     name={this.state.etatIcon}
                     size={18}
                     color={this.state.etatColor}
                     style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                     }}
                  />
               </View>
            </TouchableOpacity>
         </View>
      );
   }
}

let styles = StyleSheet.create({
   main_container: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 5,
      padding: 7,
      margin: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
   },
   capteur_id: {
      flex: 3,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
   },
   capteur_id_text: {
      flex: 1,
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
   },
   capteur_id_adresse: {
      flex: 2,
      fontSize: 14,
   },
   delete: {
      flex: 1,
      flexDirection: 'row',
   },
   capteur_changeAddress: {
      flex: 1,
   },
   deleteButton: {
      padding: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
   },
   capteur_delete_text: {
      marginLeft: 5,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();

   return <CapteurItem {...props} navigation={navigation} />;
});
