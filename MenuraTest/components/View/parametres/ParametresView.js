import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Menu, {MenuItem} from 'react-native-material-menu';
import {connect} from 'react-redux';
import Bluetooth from './bluetooth';
import firebase from 'firebase';
import Capteur from './capteur';
import {useNavigation} from '@react-navigation/core';

class ParametresView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
         currentTheme: 'Theme',
      };
   }

   /**
    * au chargement
    */
   componentDidMount() {
      this._checkIfLoggedIn();
   }

   /**
    * vérification du logging du user
    * @private
    */
   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({id: user.uid});
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   /*
    déclaration variables globales
     */
   _menu = null;

   /**
    * helper link menu
    * @param ref
    */
   setMenuRef = (ref) => {
      this._menu = ref;
   };

   /**
    * helper affichage menu
    */
   showMenu = () => {
      this._menu.show();
   };

   /**
    * helper set theme hiver
    * @private
    */
   _setThemeWinter() {
      this._menu.hide();

      this.setState({currentTheme: 'Hiver'});
      const action = {type: 'SET_WINTER'};
      this.props.dispatch(action);
   }

   /**
    * helper set theme automne
    * @private
    */
   _setThemeAutomne() {
      this._menu.hide();

      this.setState({currentTheme: 'Automne'});
      const action = {type: 'SET_AUTUMN'};
      this.props.dispatch(action);
   }

   /**
    * helper set theme printemps
    * @private
    */
   _setThemePrintemps() {
      this._menu.hide();

      this.setState({currentTheme: 'Primtemps'});
      const action = {type: 'SET_SPRING'};
      this.props.dispatch(action);
   }

   /**
    * helper set theme été
    * @private
    */
   _setThemeEte() {
      this._menu.hide();

      this.setState({currentTheme: 'Eté'});
      const action = {type: 'SET_SUMMER'};
      this.props.dispatch(action);
   }

   /**
    * helper set theme contraste
    * @private
    */
   _setThemeContraste() {
      this._menu.hide();

      this.setState({currentTheme: 'Contraste'});
      const action = {type: 'SET_CONTRASTE'};
      this.props.dispatch(action);
   }

   /**
    * helper set theme belgium
    * @private
    */
   _setThemeNaruto() {
      this._menu.hide();

      this.setState({currentTheme: 'Naruto'});
      const action = {type: 'SET_NARUTO'};
      this.props.dispatch(action);
   }

   /**
    * render
    * @return {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      return (
         <ScrollView
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View style={[styles.lineBox, {backgroundColor: theme.secondary}]}>
               <Capteur />
            </View>
            <View
               style={[
                  styles.bluetooth_component,
                  styles.lineBox,
                  {backgroundColor: theme.secondary},
               ]}>
               <Bluetooth />
            </View>
            <View
               style={[
                  styles.lineBox,
                  styles.theme_component,
                  {backgroundColor: theme.secondary},
               ]}>
               <Text style={[styles.theme_caption, {color: theme.highlight}]}>
                  Choix du thème :
               </Text>
               <View
                  style={[
                     styles.theme_menuBox,
                     {backgroundColor: theme.accent},
                  ]}>
                  <Menu
                     style={styles.theme_menu}
                     ref={this.setMenuRef}
                     button={
                        <Text
                           style={[
                              styles.theme_caption_text,
                              {color: theme.highlight, fontSize: 15},
                           ]}
                           onPress={this.showMenu}>
                           {this.state.currentTheme}
                        </Text>
                     }>
                     <MenuItem
                        onPress={this._setThemeWinter.bind(this)}
                        style={[
                           styles.theme_menu_entry,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text style={{color: theme.highlight}}>Hiver</Text>
                     </MenuItem>
                     <MenuItem
                        onPress={this._setThemeAutomne.bind(this)}
                        style={[
                           styles.theme_menu_entry,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text style={{color: theme.highlight}}>Automne</Text>
                     </MenuItem>
                     <MenuItem
                        onPress={this._setThemePrintemps.bind(this)}
                        style={[
                           styles.theme_menu_entry,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text style={{color: theme.highlight}}>Printemps</Text>
                     </MenuItem>
                     <MenuItem
                        onPress={this._setThemeEte.bind(this)}
                        style={[
                           styles.theme_menu_entry,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text style={{color: theme.highlight}}>Eté</Text>
                     </MenuItem>
                     <MenuItem
                        onPress={this._setThemeContraste.bind(this)}
                        style={[
                           styles.theme_menu_entry,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text style={{color: theme.highlight}}>Contraste</Text>
                     </MenuItem>
                     <MenuItem
                        onPress={this._setThemeNaruto.bind(this)}
                        style={[
                           styles.theme_menu_entry,
                           {backgroundColor: theme.accent},
                        ]}>
                        <Text style={{color: theme.highlight}}>Naruto</Text>
                     </MenuItem>
                  </Menu>
               </View>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
      paddingTop: 5,
      flexDirection: 'column',
   },
   lineBox: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 15,
      margin: '5%',
      marginBottom: 0,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   theme_component: {
      padding: 5,
   },
   bluetooth_component: {},
   theme_caption: {
      flex: 2,
      fontSize: 16,
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
   },
   theme_menuBox: {
      flex: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '5%',
   },
   theme_caption_text: {
      padding: '5%',
   },
   theme_menu: {},
   theme_menu_entry: {},
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();

   return <ParametresView {...props} navigation={navigation} />;
});
