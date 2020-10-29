import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {createUtilisateur} from '../../../api/utilisateur_api';

class InscriptionProfilView extends React.Component {
  constructor(props) {
    super(props);
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.password = '';
    this.password2 = '';
    this.state = {};
  }

  _nomTextInputChanged(nom) {
    this.nom = nom;
  }

  _prenomTextInputChanged(prenom) {
    this.prenom = prenom;
  }

  _emailTextInputChanged(email) {
    this.email = email;
  }

  _passwordTextInputChanged(password) {
    this.password = password;
  }

  _password2TextInputChanged(password2) {
    this.password2 = password2;
  }

  _register(nom, prenom, email, password, password2, navigation) {
    if (password === password2) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User created and signed in!');
          createUtilisateur(nom, prenom, email).then((data) =>
            console.log(data),
          );
          navigation.navigate('modificationProfil');
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(error.toString());
        });
    } else {
      Alert.alert('le mot de passe doit être identique');
    }
  }

  render() {
    const {navigation} = this.props;
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <TextInput
          style={[styles.textinput]}
          placeholder="nom"
          onChangeText={(nom) => this._nomTextInputChanged(nom)}
        />
        <TextInput
          style={[styles.textinput]}
          placeholder="prénom"
          onChangeText={(prenom) => this._prenomTextInputChanged(prenom)}
        />
        <TextInput
          style={[styles.textinput]}
          placeholder="email"
          onChangeText={(email) => this._emailTextInputChanged(email)}
        />
        <TextInput
          style={[styles.textinput]}
          placeholder="mot de passe"
          secureTextEntry={true}
          onChangeText={(password) => this._passwordTextInputChanged(password)}
        />
        <TextInput
          style={[styles.textinput]}
          placeholder="mot de passe"
          secureTextEntry={true}
          onChangeText={(password2) =>
            this._password2TextInputChanged(password2)
          }
        />
        <TouchableOpacity
          style={[styles.modifButton, {backgroundColor: theme.secondary}]}
          onPress={() =>
            this._register(
              this.nom,
              this.prenom,
              this.email,
              this.password,
              this.password2,
              navigation,
            )
          }>
          <Text>inscription</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: 5,
    flexDirection: 'column',
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    height: 50,
    borderWidth: 5,
    borderRadius: 10,
    paddingLeft: 10,
  },
  modifButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 5,
    width: '50%',
    padding: 3,
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();

  return <InscriptionProfilView {...props} navigation={navigation} />;
});
