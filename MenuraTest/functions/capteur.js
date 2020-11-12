import React from 'react';
import {
  StyleSheet,
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
import Capteur_Item from './capteurItem';
import firebase from 'firebase';
import {addCapteur, getCapteurListById} from '../api/capteur_api';

class Capteur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updater: false,
      user: {},
      capteur_list: '',
      user_id: '',
      mac_add_capteur: '',
      mac_address_message: '',
      status_text: 'Aucun capteur lié',
    };
    this.mac_add_input = React.createRef();
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

  /**
   * récupération de la liste des capteur de l'utilisateur par la requete get
   * @param user
   */
  load_capteur_list(user) {
    this.setState({list_caption: 'Chargement de vos capteurs'});
    user.getIdToken(true).then((idToken) => {
      getCapteurListById(this.state.user_id, idToken).then((data) =>
        this.setState({capteur_list: data.data}),
      );
    });
  }

  reload_list() {
    console.log('reload');
    this.setState({updater: !this.state.updater});
    this.load_capteur_list(this.state.user);
  }

  /**
   * helper textInput changement de la macAdresse
   * @param mac_adresse
   * @private
   */
  _mac_adresse_change(mac_adresse) {
    this.setState({mac_add_capteur: mac_adresse});
  }

  /**
   * ajout d'un capteur
   * vérification de la valeur de la mac adresse
   * envois par requete POST a la base de donnée
   * @private
   */
  _add_capteur() {
    let Mac_Regex = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
    if (Mac_Regex.test(this.state.mac_add_capteur)) {
      this.state.user.getIdToken(true).then((idToken) => {
        addCapteur(this.state.user_id, idToken, this.state.mac_add_capteur)
          .then(this.mac_add_input.current.clear())
          .then(this.load_capteur_list(this.state.user))
          .then(this.reload_list)
          .catch((e) => console.log(e));
      });
    } else {
      console.log('error on mac addresse');
      this.setState({
        mac_address_message: 'veuillez enter une mac adresse valide',
      });
    }
  }

  /**
   * render
   * @return {JSX.Element}
   */
  render() {
    let theme = this.props.currentStyle;
    console.log(this.state.capteur_list);
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={[styles.container]}>
          <View style={[styles.container_header]}>
            <Text style={[styles.title, {color: theme.highlight}]}>
              Liste de mes Capteurs
            </Text>
            <View
              style={[
                styles.add_capteur_container,
                {backgroundColor: theme.primary, color: theme.highlight},
              ]}>
              <Text style={{color: theme.highlight}}>Adresse MAC :</Text>
              <TextInput
                placeholder="FF:FF:FF:FF:FF:FF"
                autocorrect={false}
                ref={this.mac_add_input}
                onChangeText={(mac_adresse) =>
                  this._mac_adresse_change(mac_adresse)
                }
                style={[styles.add_capteur_input, {color: theme.highlight}]}
              />
              <TouchableOpacity
                onPress={this._add_capteur.bind(this)}
                style={[
                  styles.add_capteur_button,
                  {backgroundColor: theme.highlight},
                ]}>
                <Icon
                  name="add"
                  size={18}
                  color={theme.primary}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={[styles.mac_address_message, {color: theme.highlight}]}>
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
                  extraData={this.state.reload}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                    <Capteur_Item
                      reload_list={this.reload_list.bind(this)}
                      data={{
                        capteur: item,
                        user: this.state.user,
                      }}
                    />
                  )}
                />
              </View>
            ) : (
              <Text style={[styles.capteur_unknown, {color: theme.highlight}]}>
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
  container: {
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
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
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
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  add_capteur_input: {
    width: 150,
    marginLeft: 5,
    marginRight: 5,
    padding: 10,
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

export default connect(mapStateToProps)(Capteur);
