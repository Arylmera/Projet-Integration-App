import React from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   TextInput,
   Text,
   FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {addOiseaux, getOiseaux} from '../../../api/oiseaux_api';
import firebase from 'firebase';

const Bird_list_add = ({oiseau, theme}) => (
   <View
      style={[
         styles.bird_list_add_container_item,
         {backgroundColor: theme.secondary},
      ]}>
      <Text style={[styles.bird_list_add_item_text, {color: theme.highlight}]}>
         {oiseau.nom}
      </Text>
      <Text style={[styles.bird_list_add_item_text, {color: theme.highlight}]}>
         {oiseau.espece}
      </Text>
   </View>
);

class HistoriqueAdd extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         date: '',
         localisation: 'Inconnue',
         oiseau: {},
         bird_list: [],
         loading: false,
         found: false,
         user_id: '',
         user: {},
      };
   }

   /**
    * au chargement du component
    */
   componentDidMount() {
      this._checkIfLoggedIn();
      if (this.state.user_id !== '') {
      }
   }

   /**
    * check du login utilisateur et récupération des informations
    * @private
    */
   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({user_id: user.uid, user: user});
            this.load_capteur_list(user);
         } else {
            console.log('no user');
         }
      });
   }

   _nameTextInputChanged(name) {
      this.setState({found: false});
      this.setState({name: name});
   }

   nameTextInputChanged(name) {
      this.setState({found: false});
      this.setState({name: name});
   }

   _locTextInputChanged(loc) {
      this.setState({found: false});
      this.setState({localisation: loc});
   }

   _getDate() {
      let current_date = new Date();
      let formated_date =
         current_date.getFullYear() +
         '-' +
         current_date.getMonth() +
         '-' +
         current_date.getDay();
      this.setState({date: formated_date});
   }

   _check_bird() {
      if (this.state.bird_list.length === 1) {
         this.setState({name: this.state.bird_list[0].nom});
         this.setState({found: true});
         return true;
      } else {
         return false;
      }
   }

   _build_bird(data) {
      this.setState({bird_list: data.data});
      if (this._check_bird()) {
         let oiseau = {
            oiseau: this.state.name,
            date: this.state.date,
            localisation: this.state.localisation,
            capteur: 'Menura App',
         };
         this.setState({oiseau: oiseau});
      } else {
         console.log('Not found');
      }
      this.setState({loading: false});
   }

   _submitNewBird() {
      this._getDate();
      if (this.state.name.length > 0) {
         this.setState({loading: true});
         getOiseaux(this.state.name).then((data) => {
            this._build_bird(data);
         });
      }
   }

   _clear() {
      this._nameTextInputChanged('');
      this._locTextInputChanged('');
      this.setState({found: false});
      this.setState({loading: false});
      this.setState({bird_list: []});
   }

   _sendNewBird() {
      console.log("ajout de l'oiseau :");
      console.log(this.state.oiseau);
      this.state.user.getIdToken(true).then((idToken) => {
         addOiseaux(this.state.user_id, idToken, this.state.oiseau).then(
            this._clear(),
         );
      });
   }

   _bird_list_builder(theme) {
      if (this.state.bird_list.length > 0) {
         return (
            <View style={styles.bird_list_add_container}>
               <View
                  style={[
                     styles.bird_list_add_title_container,
                     {backgroundColor: theme.secondary},
                  ]}>
                  <Text
                     style={[
                        styles.bird_list_add_title_container_title,
                        {color: theme.highlight},
                     ]}>
                     {' '}
                     Nom{' '}
                  </Text>
                  <Text
                     style={[
                        styles.bird_list_add_title_container_title,
                        {color: theme.highlight},
                     ]}>
                     {' '}
                     Espèce{' '}
                  </Text>
               </View>
               <FlatList
                  data={this.state.bird_list}
                  style={styles.flatList_bird_add}
                  keyExtractor={(item) => item.idoiseaux}
                  renderItem={({item}) => (
                     <Bird_list_add oiseau={item} theme={theme} />
                  )}
               />
            </View>
         );
      } else {
         return (
            <Text style={{color: theme.highlight}}>
               {' '}
               Entrez un nom d'oiseau pour ajouter celui-ci a votre historique
            </Text>
         );
      }
   }

   render() {
      const {navigation} = this.props;
      let theme = this.props.currentStyle;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <TouchableOpacity
               style={[styles.touchableOpacity]}
               onPress={() =>
                  navigation.navigate(this.props.route.params.root)
               }>
               <Icon
                  name="keyboard-arrow-left"
                  size={35}
                  color={theme.highlight}
               />
            </TouchableOpacity>
            <Text style={[styles.form_header, {color: theme.highlight}]}>
               Ajouter un oiseau manuellement
            </Text>
            <View style={[styles.text_input_container]}>
               <TextInput
                  style={[
                     styles.text_input_elem,
                     styles.bird_name,
                     {
                        backgroundColor: theme.secondary,
                        color: theme.highlight,
                     },
                  ]}
                  placeholder="Nom de l'oiseau"
                  placeholderTextColor={theme.highlight}
                  secureTextEntry={false}
                  autoCorrect={false}
                  onChangeText={(name) => this._nameTextInputChanged(name)}
               />
               <TextInput
                  style={[
                     styles.text_input_elem,
                     styles.bird_localisation,
                     {
                        backgroundColor: theme.secondary,
                        color: theme.highlight,
                     },
                  ]}
                  placeholder="Localisation"
                  placeholderTextColor={theme.highlight}
                  secureTextEntry={false}
                  autoCorrect={false}
                  onChangeText={(localisation) =>
                     this._locTextInputChanged(localisation)
                  }
               />
               <View
                  style={[
                     styles.submit_button,
                     {backgroundColor: theme.secondary},
                  ]}>
                  {!this.state.loading ? (
                     <TouchableOpacity onPress={() => this._submitNewBird()}>
                        <Text style={{color: theme.highlight}}>Rechercher</Text>
                     </TouchableOpacity>
                  ) : (
                     <Text style={{color: theme.highlight}}>
                        Veuillez patienter
                     </Text>
                  )}
               </View>
            </View>
            <View style={[styles.valiation_container]}>
               {this.state.found ? (
                  <View style={[styles.valiation_container_ok]}>
                     <Text
                        style={[
                           styles.valiation_text,
                           {color: theme.highlight},
                        ]}>
                        {' '}
                        Cette oiseau est t-il le bon ?{' '}
                     </Text>
                     <View
                        style={[
                           styles.validation_oiseau_container,
                           {backgroundColor: theme.secondary},
                        ]}>
                        <Text style={[{color: theme.highlight}]}>
                           Nom : {this.state.oiseau.oiseau}
                        </Text>
                        <Text style={[{color: theme.highlight}]}>
                           Localisation : {this.state.oiseau.localisation}
                        </Text>
                        <Text style={[{color: theme.highlight}]}>
                           Date : {this.state.oiseau.date}
                        </Text>
                        <Text style={[{color: theme.highlight}]}>
                           Capteur : {this.state.oiseau.capteur}
                        </Text>
                     </View>
                     <TouchableOpacity
                        style={[
                           styles.add_bird_button,
                           {backgroundColor: theme.secondary},
                        ]}
                        onPress={() => this._sendNewBird()}>
                        <Text style={[{color: theme.highlight}]}>Ajouter</Text>
                     </TouchableOpacity>
                  </View>
               ) : (
                  <View style={[styles.valiation_container_NOTok]}>
                     <Text
                        style={[
                           styles.valiation_text,
                           {color: theme.highlight},
                        ]}>
                        Liste des oiseaux Possibles
                     </Text>
                     <View style={styles.valiation_container_corps}>
                        {this._bird_list_builder(theme)}
                     </View>
                  </View>
               )}
            </View>
         </View>
      );
   }
}

let styles = StyleSheet.create({
   main_container: {
      flex: 1,
   },
   text_input_container: {
      height: '18%',
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
   text_input_elem: {
      flex: 1,
      width: '50%',
      margin: 5,
      paddingLeft: 10,
      alignItems: 'center',
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
   },
   bird_name: {},
   bird_localisation: {},
   bird_detection: {},
   form_header: {
      fontSize: 20,
      marginBottom: 20,
      fontWeight: 'bold',
      marginLeft: 'auto',
      marginRight: 'auto',
   },
   submit_button: {
      marginTop: 5,
      padding: 5,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
   },
   valiation_container: {
      marginTop: 30,
      flexDirection: 'column',
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
   },
   valiation_container_ok: {},
   valiation_text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      alignSelf: 'center',
      width: '100%',
   },
   validation_oiseau_container: {
      padding: 5,
      borderRadius: 5,
   },
   add_bird_button: {
      borderRadius: 5,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 100,
   },
   valiation_container_NOTok: {},
   bird_list_add_container: {
      flexDirection: 'column',
      flex: 1,
   },
   bird_list_add_title_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      margin: 5,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
   },
   bird_list_add_title_container_title: {
      fontWeight: 'bold',
   },
   valiation_container_corps: {
      flex: 1,
   },
   flatList_bird_add: {
      flex: 1,
   },
   bird_list_add_container_item: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      padding: 5,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
   },
   bird_list_add_item_text: {
      flexDirection: 'row',
      padding: 5,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <HistoriqueAdd {...props} navigation={navigation} />;
});
