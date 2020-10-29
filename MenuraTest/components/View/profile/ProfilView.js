import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {getUtilisateur} from '../../../api/utilisateur_api';

class ProfilView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prenom: 'User name',
      nom: 'User lastName',
      email: 'email',
      profileIcon: '../../assets/images/profileIcon.png',
      password: '',
      newPassword: '',
      updatePasswordModal: false,
      deleteAccountModal: false,
    };
  }

  componentDidMount() {
    this._checkIfLoggedIn();
  }

  _getUtilisateur(email) {
    getUtilisateur(email).then((data) =>
      this.setState({nom: data.data[0].nom, prenom: data.data[0].prenom}),
    );
  }

  _checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let email = user.email;
        this._getUtilisateur(email);
        this.setState({email: email});
      } else {
        this.props.navigation.navigate('ConnexionProfil');
      }
    });
  }

  _logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('déconnecté');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _passwordTextInputChanged(password) {
    this.setState({password: password});
  }

  _newPasswordTextInputChanged(newPassword) {
    this.setState({newPassword: newPassword});
  }

  _askDeleteAccount() {
    this.setState({deleteAccountModal: true});
  }

  _askUpdatePassword() {
    this.setState({updatePasswordModal: true});
  }

  _deleteAccount() {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.password,
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => console.log('authentifié !'))
      .catch((error) => console.log(error));
    user
      .delete()
      .then(() => {
        console.log('compte supprimé');
        this.setState({deleteAccountModal: false});
        this.props.navigation.navigate('ConnexionProfil');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  _updatePassword() {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      this.state.password,
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => console.log('authentifié !'))
      .catch((error) => console.log(error));
    user
      .updatePassword(this.state.newPassword)
      .then(() => {
        console.log('mot de passe modifié');
        this.setState({updatePasswordModal: false});
        this.props.navigation.navigate('modificationProfil');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {navigation} = this.props;
    let theme = this.props.currentStyle;
    return (
      <ScrollView
        style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <View style={styles.container_row}>
          <View style={styles.headerProfile}>
            <Text style={styles.nameStyle}> {this.state.prenom} </Text>
            <Text style={styles.lastNameStyle}> {this.state.nom} </Text>
          </View>
          <Image
            source={{uri: this.state.profileIcon}}
            style={[styles.profileIcon, {backgroundColor: theme.highlight}]}
          />
        </View>
        <View style={styles.container_row}>
          <View style={styles.body_container}>
            <Text>{this.state.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.modifButton, {backgroundColor: theme.secondary}]}
          onPress={() => this._askUpdatePassword()}>
          <Text>modifier mot de passe</Text>
        </TouchableOpacity>
        <Modal visible={this.state.updatePasswordModal}>
          <Text style={[styles.text]}>Mot de passe actuel:</Text>
          <TextInput
            style={[styles.textinput, {marginTop: 20}]}
            placeholder="mot de passe"
            secureTextEntry={true}
            onChangeText={(password) =>
              this._passwordTextInputChanged(password)
            }
          />
          <Text style={[styles.text]}>Nouveau mot de passe:</Text>
          <TextInput
            style={[styles.textinput, {marginTop: 20}]}
            placeholder="mot de passe"
            onChangeText={(newPassword) =>
              this._newPasswordTextInputChanged(newPassword)
            }
          />
          <TouchableOpacity
            style={[styles.modifButton, {backgroundColor: '#0084d1'}]}
            onPress={() => this._updatePassword()}>
            <Text>modifier mon mot de passe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modifButton, {backgroundColor: '#000000'}]}
            onPress={() => this.setState({updatePasswordModal: false})}>
            <Text style={{color: '#ffffff'}}>Annuler</Text>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity
          style={[styles.modifButton, {backgroundColor: theme.secondary}]}
          onPress={() => this._logOut()}>
          <Text>déconnexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modifButton, {backgroundColor: theme.secondary}]}
          onPress={() => this._askDeleteAccount()}>
          <Text>supprimer compte</Text>
        </TouchableOpacity>
        <Modal visible={this.state.deleteAccountModal}>
          <Text style={[styles.text]}>
            Attention cette action supprime définitivement votre compte !
          </Text>
          <Text style={[styles.text]}>
            Pour continuer, entrez votre mot de passe :
          </Text>
          <TextInput
            style={[styles.textinput, {marginTop: 20}]}
            placeholder="mot de passe"
            secureTextEntry={true}
            onChangeText={(password) =>
              this._passwordTextInputChanged(password)
            }
          />
          <TouchableOpacity
            style={[styles.modifButton, {backgroundColor: '#de0404'}]}
            onPress={() => this._deleteAccount()}>
            <Text>Supprimer mon compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modifButton, {backgroundColor: '#000000'}]}
            onPress={() => this.setState({deleteAccountModal: false})}>
            <Text style={{color: '#ffffff'}}>Annuler</Text>
          </TouchableOpacity>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  container_row: {
    margin: 10,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  body_container: {
    flex: 1,
    flexDirection: 'column',
  },
  body_info: {
    flex: 1,
  },
  body_footer: {
    flex: 1,
  },
  headerProfile: {
    flex: 1,
    justifyContent: 'center',
  },
  nameStyle: {
    marginRight: 'auto',
    fontSize: 25,
    fontWeight: 'bold',
  },
  lastNameStyle: {
    marginTop: 20,
    marginRight: 'auto',
    fontSize: 20,
  },
  profileIcon: {
    flex: 1,
    marginTop: 10,
    borderRadius: 100,
    width: 150,
    height: 150,
  },
  modifButton: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 5,
    width: '50%',
    padding: 3,
    alignItems: 'center',
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
  text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 40,
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();

  return <ProfilView {...props} navigation={navigation} />;
});
