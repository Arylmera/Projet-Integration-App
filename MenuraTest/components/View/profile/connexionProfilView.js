import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';

class ConnexionProfilView extends React.Component {
  constructor(props) {
    super(props);
    this.email = '';
    this.password = '';
    this.state = {
      errorMessage: "",
      borderEmail: "#b8b8b8",
        borderPassword: "#b8b8b8"
    };
  }

  _emailTextInputChanged(email) {
    this.email = email;
  }

  _passwordTextInputChanged(password) {
    this.password = password;
  }

  _signIn(email, password, navigation) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        navigation.navigate('Views', {params: {}});
      })
      .catch((error) => {
        console.error(error);
        this.setState({errorMessage: error.message, borderEmail: '#c20000', borderPassword: '#c20000'})
      });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.main_container}>
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderEmail}]}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(email) => this._emailTextInputChanged(email)}
          onFocus={() => this.setState({borderEmail: '#000000'})}
          onBlur={() => this.setState({borderEmail: '#b8b8b8'})}
        />
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderPassword}]}
          placeholder="mot de passe"
          secureTextEntry={true}
          onChangeText={(password) => this._passwordTextInputChanged(password)}
          onFocus={() => this.setState({borderPassword: '#000000'})}
          onBlur={() => this.setState({borderPassword: '#b8b8b8'})}
        />
          <Text
                style={styles.errorText}
          >
                {this.state.errorMessage}
          </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this._signIn(this.email, this.password, navigation)}>
          <Text>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('InscriptionProfil')}>
          <Text>inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ResetPasswordProfil')}>
          <Text>mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.googleButton}
            onPress={() => navigation.navigate('Profil')}>
          <Text
              style={styles.googleText}
          >
            Google
          </Text>
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
  errorText: {
    marginLeft: 25,
    marginTop: 10,
    color: '#c20000'
  },
  googleButton: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
      borderWidth: 1,
      borderRadius: 4,
      width: '50%',
      padding: 3,
      alignItems: 'center',
      backgroundColor: '#FFFFFF'
  },
  googleText: {
      color: "#e30b0b",
      fontWeight: "bold"
  }
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();

  return <ConnexionProfilView {...props} navigation={navigation} />;
});
