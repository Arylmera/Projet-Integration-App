import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
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
    this.state = {
        helperText: "",
        errorMessage: "",
        borderNom: "#b8b8b8",
        borderPrenom: "#b8b8b8",
        borderEmail: "#b8b8b8",
        borderPassword1: "#b8b8b8",
        borderPassword2: "#b8b8b8"
    };
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
          const user = firebase.auth().currentUser;
          createUtilisateur(nom, prenom, email).then((data) =>
            console.log(data)
          );
          user.sendEmailVerification()
              .then(() => {
            // Email sent.
              })
              .catch((error) => {
                console.log(error)
              });
          navigation.navigate('Views');
        })
        .catch((error) => {
          console.error(error);
            this.setState({errorMessage: error.message, borderEmail: '#c20000', borderPassword1: '#c20000', borderPassword2: '#c20000'})
        });
    } else {
        this.setState({errorMessage: "les mots de passe ne sont pas identiques", borderPassword1: '#c20000', borderPassword2: '#c20000'})
    }
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.main_container}>
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderNom}]}
          placeholder="nom"
          onChangeText={(nom) => this._nomTextInputChanged(nom)}
          onFocus={() => this.setState({borderNom: '#000000'})}
          onBlur={() => this.setState({borderNom: '#b8b8b8'})}
        />
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderPrenom}]}
          placeholder="prénom"
          onChangeText={(prenom) => this._prenomTextInputChanged(prenom)}
          onFocus={() => this.setState({borderPrenom: '#000000'})}
          onBlur={() => this.setState({borderPrenom: '#b8b8b8'})}
        />
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderEmail}]}
          placeholder="email"
          onChangeText={(email) => this._emailTextInputChanged(email)}
          onFocus={() => this.setState({borderEmail: '#000000'})}
          onBlur={() => this.setState({borderEmail: '#b8b8b8'})}
        />
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderPassword1}]}
          placeholder="mot de passe"
          secureTextEntry={true}
          onChangeText={(password) => this._passwordTextInputChanged(password)}
          onFocus={() => this.setState({borderPassword1: '#000000', helperText: "minimum 6 caractères"})}
          onBlur={() => this.setState({borderPassword1: '#b8b8b8', helperText: ""})}
        />
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderPassword2}]}
          placeholder="mot de passe"
          secureTextEntry={true}
          onChangeText={(password2) =>
            this._password2TextInputChanged(password2)}
          onFocus={() => this.setState({borderPassword2: '#000000', helperText: "Veuillez confirmer le mot de passe"})}
          onBlur={() => this.setState({borderPassword2: '#b8b8b8', helperText: ""})}
        />
        <Text
            style={styles.helperText}
        >
            {this.state.helperText}
        </Text>
          <Text
              style={styles.errorText}
          >
              {this.state.errorMessage}
          </Text>
        <TouchableOpacity
          style={styles.button}
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
  },
  textInput: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      height: 50,
      borderRadius: 4,
      borderWidth: 1,
      paddingLeft: 10,
  },
  button: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      borderWidth: 1,
      borderRadius: 4,
      width: '50%',
      padding: 3,
      alignItems: 'center',
  },
  helperText: {
      marginLeft: 25,
      marginTop: 10
  },
    errorText: {
        marginLeft: 25,
        marginTop: 10,
        color: '#c20000'
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
