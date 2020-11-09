import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import {connect} from 'react-redux';
import {Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Capteur_Item from './capteurItem';
import firebase from 'firebase';
import {getHistoriqueByID} from '../api/historique_api';

class Capteur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capteur_list: [
        {id: 0, name: 'testing'},
        {id: 1, name: 'testing1'},
        {id: 2, name: 'testing2'},
      ],
      user_id: '',
      mac_add_capteur: '',
      mac_address_message: '',
      status_text: 'Aucun capteur lié',
    };
  }

  componentDidMount() {
    this._checkIfLoggedIn();
    if (this.state.user_id !== '') {
    }
  }

  _checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user_id: user.uid});
        this.load_capteur_list(user);
      } else {
        console.log('no user');
      }
    });
  }

  load_capteur_list(user) {
    console.log('loading capteur list for user : ' + this.state.user_id);
    user.getIdToken(true).then((idToken) => {
      getHistoriqueByID(this.state.user_id, idToken).then((data) =>
        console.log(data), // set state capteur_list
      );
    });
  }

  _mac_adresse_change(mac_adresse) {
    this.setState({mac_add_capteur: mac_adresse});
  }

  _add_capteur() {
    let Mac_Regex = /^(([A-Fa-f0-9]{2}[:]){5}[A-Fa-f0-9]{2}[,]?)+$/i;
    if (Mac_Regex.test(this.state.mac_add_capteur)) {
      console.log(this.state.mac_add_capteur + ' is a mac addresse');
      // Ajout du capteur dans la DB lié a l'utilisateur
    } else {
      console.log('error on mac addresse');
      this.setState({
        mac_address_message: 'veuillez enter une mac adresse valide',
      });
    }
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.container]}>
        <View style={[styles.container_header]}>
          <Text style={[styles.title, {color: theme.highlight}]}>
            Capteurs liés
          </Text>
          <View
            style={[
              styles.add_capteur_container,
              {backgroundColor: theme.accent, color: theme.highlight},
            ]}>
            <Text style={{color: theme.highlight}}>Adresse MAC :</Text>
            <TextInput
              placeholder="FF:FF:FF:FF:FF:FF"
              autocorrect={false}
              onChangeText={(mac_adresse) =>
                this._mac_adresse_change(mac_adresse)
              }
              style={[styles.add_capteur_input, {color: theme.highlight}]}
            />
            <TouchableOpacity
              onPress={this._add_capteur.bind(this)}
              style={[
                styles.add_capteur_button,
                {backgroundColor: theme.accent},
              ]}>
              <Icon
                name="add"
                size={18}
                color={theme.highlight}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={[styles.mac_address_message, {color: theme.highlight}]}>
            {this.state.mac_address_message}
          </Text>
        </View>
        <Divider />
        <View style={styles.capteur_list}>
          {this.state.capteur_list.length > 0 ? (
            <FlatList
              data={this.state.capteur_list}
              style={styles.FlatlistItem}
              keyExtractor={(item) => item.id}
              renderItem={({item}) => (
                <Capteur_Item
                  data={{
                    capteur: item,
                  }}
                />
              )}
            />
          ) : (
            <Text style={[styles.capteur_unknown, {color: theme.highlight}]}>
              {this.state.status_text}
            </Text>
          )}
        </View>
      </View>
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
  container_header: {
    flex: 1,
    alignItems: 'center',
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
    padding: 5,
    width: '90%',
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
