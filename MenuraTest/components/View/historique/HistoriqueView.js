import React from 'react';
import {StyleSheet, View, FlatList, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {getHistoriqueByID} from '../../../api/historique_api';
import HistoriqueItem from './historiqueItem';
import {useNavigation} from '@react-navigation/core';
import Icon from 'react-native-vector-icons/MaterialIcons';

class HistoriqueView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         oiseauxListe: [],
      };
   }

   /**
    * chargement du component
    */
   componentDidMount() {
      this._checkIfLoggedIn();
   }

   /**
    * check si l'utilisateur est connécté et récupère ces info
    * @private
    */
   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this._load_user_historique(user);
         } else {
            console.log('no user');
         }
      });
   }

   /**
    *
    * @param user
    * @private
    */
   _load_user_historique(user) {
      console.log('loading user historique for user : ' + user.uid);
      user.getIdToken(true).then((idToken) => {
         getHistoriqueByID(user.uid, idToken).then((data) =>
            this._handle_data_historique(data),
         );
      });
   }

   /**
    * gestion des données recu par la requete get
    * @param data
    * @private
    */
   _handle_data_historique(data) {
      this.setState({oiseauxListe: data.data});
      for (let item of this.state.oiseauxListe) {
         console.log(item);
      }
   }

   /**
    * render
    * @return {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      const {navigation} = this.props;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View style={[styles.condition_container]}>
               <Text
                  style={[
                     styles.list_header,
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}>
                  Liste des oiseaux détecté par votre capteur
               </Text>
               <FlatList
                  data={this.state.oiseauxListe}
                  style={styles.FlatlistItem}
                  keyExtractor={(item) => item.idhistoriques}
                  renderItem={({item}) => (
                     <HistoriqueItem
                        data={{oiseau: item, root: 'HistoriqueView'}}
                     />
                  )}
               />
               <TouchableOpacity
                  style={[styles.addButton, {backgroundColor: theme.secondary}]}
                  onPress={() =>
                     navigation.navigate('HistoriqueAdd', {
                        root: 'HistoriqueView',
                     })
                  }>
                  <Icon name="add" size={50} color={theme.highlight} />
               </TouchableOpacity>
            </View>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
   },
   condition_container: {
      flex: 1,
      flexDirection: 'column',
   },
   list_header: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 20,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   detailButton: {
      borderRadius: 5,
      width: '25%',
      padding: 3,
      alignItems: 'center',
      justifyContent: 'center',
   },
   FlatlistItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
   },
   addButton: {
      borderRadius: 100,
      alignItems: 'center',
      position: 'absolute',
      bottom: 15,
      right: 15,
      zIndex: 100,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 2,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <HistoriqueView {...props} navigation={navigation} />;
});
