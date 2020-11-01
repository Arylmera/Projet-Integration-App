import React from 'react';
import {
  Alert,
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
      errorBorder: "#000000"
    };
  }

  componentDidMount() {
    this._checkIfLoggedIn();
  }

  _checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('modificationProfil');
      } else {
        this.props.navigation.navigate('ConnexionProfil');
      }
    });
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
        navigation.navigate('modificationProfil', {params: {}});
      })
      .catch((error) => {
        console.error(error);
        this.setState({errorMessage: error.message, errorBorder: '#c20000'})
      });
  }

  render() {
    const {navigation} = this.props;
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <View>
        <TextInput
          style={[styles.textinput, {borderColor: this.state.errorBorder}]}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={(email) => this._emailTextInputChanged(email)}
          onFocus={() => console.log('focus')}
        />
        <Text></Text>
        </View>
        <View>
        <TextInput
          style={[styles.textinput, {borderColor: this.state.errorBorder}]}
          placeholder="mot de passe"
          secureTextEntry={true}
          onChangeText={(password) => this._passwordTextInputChanged(password)}
          onFocus={() => console.log('focus')}
        />
        <Text
            style={styles.errorText}
        >
          {this.state.errorMessage}
        </Text>
        </View>
        <TouchableOpacity
          style={[styles.modifButton, {backgroundColor: theme.secondary}]}
          onPress={() => this._signIn(this.email, this.password, navigation)}>
          <Text>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modifButton, {backgroundColor: theme.secondary}]}
          onPress={() => navigation.navigate('InscriptionProfil')}>
          <Text>inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modifButton, {backgroundColor: theme.secondary}]}
          onPress={() => navigation.navigate('ResetPasswordProfil')}>
          <Text>mot de passe oublié ?</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.modifButton, {backgroundColor: "#FFFFFF"}]}
            onPress={() => navigation.navigate('Profil')}>
          <Text
              style={{color: "#e30b0b", fontWeight: "bold"}}
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
    flexDirection: 'column',
  },
  textinput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    height: 50,
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 10,
  },
  modifButton: {
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
    marginTop: 15,
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

  return <ConnexionProfilView {...props} navigation={navigation} />;
});
