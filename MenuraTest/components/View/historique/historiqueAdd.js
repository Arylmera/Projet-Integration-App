import React from 'react';
import {
   StyleSheet,
   View,
   TouchableOpacity,
   TextInput,
   Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getOiseaux} from '../../../api/oiseaux_api';

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
      };
   }

   _nameTextInputChanged(name) {
      this.setState({name: name});
   }

   _locTextInputChanged(loc) {
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
      this.setState({found: false});
      this._getDate();
      if (this.state.name.length > 0) {
         this.setState({loading: true});
         getOiseaux(this.state.name).then((data) => {
            this._build_bird(data);
         });
      }
   }

   _sendNewBird() {
      console.log(this.state.oiseau);
   }

   _bird_list_builder() {
      if (this.state.bird_list.length > 0) {
      } else {
         return (
            <Text>
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
               <View style={[styles.text_input]}>
                  <TextInput
                     style={[
                        styles.text_input_elem,
                        styles.bird_name,
                        {backgroundColor: theme.secondary},
                     ]}
                     placeholder="Nom de l'oiseau"
                     placeholderTextColor={theme.highlight}
                     secureTextEntry={false}
                     autoCorrect={false}
                     onChangeText={(name) => this._nameTextInputChanged(name)}
                  />
               </View>
               <View style={[styles.text_input]}>
                  <TextInput
                     style={[
                        styles.text_input_elem,
                        styles.bird_localisation,
                        {backgroundColor: theme.secondary},
                     ]}
                     placeholder="Localisation"
                     placeholderTextColor={theme.highlight}
                     secureTextEntry={false}
                     autoCorrect={false}
                     onChangeText={(localisation) =>
                        this._locTextInputChanged(localisation)
                     }
                  />
               </View>
               <View style={[styles.submit_button]}>
                  {!this.state.loading ? (
                     <TouchableOpacity onPress={() => this._submitNewBird()}>
                        <Text>Rechercher</Text>
                     </TouchableOpacity>
                  ) : (
                     <Text>Veuillez patienter</Text>
                  )}
               </View>
            </View>
            <View style={[styles.valiation_container]}>
               {this.state.found ? (
                  <View style={[styles.valiation_container_ok]}>
                     <Text style={styles.valiation_text}>
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
                        <Text>Ajouter</Text>
                     </TouchableOpacity>
                  </View>
               ) : (
                  <View style={[styles.valiation_container_NOTok]}>
                     <Text style={styles.valiation_text}>
                        Liste des oiseaux Possibles
                     </Text>
                     <View>{this._bird_list_builder()}</View>
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
      height: '15%',
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
   text_input: {
      flex: 1,
      margin: 5,
      width: '100%',
      alignItems: 'center',
   },
   text_input_elem: {
      padding: 10,
      borderRadius: 5,
      width: '50%',
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
   submit_buttton: {},
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
