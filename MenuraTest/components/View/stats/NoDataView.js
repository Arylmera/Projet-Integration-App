import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

class NoDataView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         prenom: '',
      };
   }

   /**
    * au chargement
    */
   componentDidMount() {
      this._checkIfLoggedIn();
   }

   /**
    * vérification si l'utilisateur est connécté et récupère ses infos
    * @private
    */
   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({
               prenom: user.displayName.split(' ')[1],
            });
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   /**
    * render
    * @returns {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <Text style={[styles.text, {color: theme.highlight}]}>
               Bonjour {this.state.prenom}, vous n'avez pas encore de données
               enregistrées.{'\n'}
               Pour profiter pleinement de notre application n'oubliez pas de
               vous procurer le capteur Menura.{'\n'}
               Si c'est déjà le cas mettez le en route et les premiers résultats
               ne devraient plus tarder.{'\n'}
               {'\n'}
               Merci de votre confiance.
            </Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
      alignItems: 'center',
   },
   text: {
      marginLeft: '5%',
      marginTop: '50%',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <NoDataView {...props} navigation={navigation} />;
});
