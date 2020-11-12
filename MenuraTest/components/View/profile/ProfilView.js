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

class ProfilView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      prenom: 'User name',
      nom: 'User lastName',
      email: 'email',
      profileIcon: require('../../../assets/images/profileIcon.png'),
      password: '',
      newPassword: '',
      updatePasswordModal: false,
      deconnexionModal: false,
      deleteAccountModal: false,
    }
  }

  componentDidMount() {
    this._checkIfLoggedIn();
  }

  _checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let email = user.email;
        let uid = user.uid;
        let nom = user.displayName.split(' ')[0];
        let prenom = user.displayName.split(' ')[1];
        this.setState({email: email, nom: nom, prenom: prenom, id: uid});
      } else {
        this.props.navigation.navigate('connexion');
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

  _askDeconnexion() {
    this.setState({deconnexionModal: true});
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
        this.props.navigation.navigate('connexion');
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
            source={this.state.profileIcon}
            style={[styles.profileIcon, {backgroundColor: theme.secondary}]}
          />
        </View>
        <View style={styles.container_row}>
          <View style={styles.body_container}>
            <Text>{this.state.email}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.secondary}]}
          onPress={() => this._askUpdatePassword()}>
          <Text>modifier mot de passe</Text>
        </TouchableOpacity>

        <Modal visible={this.state.updatePasswordModal}>
          <ScrollView>
          <Text style={[styles.text]}>Mot de passe actuel:</Text>
          <TextInput
            style={[styles.textinput, {marginTop: 20}]}
            placeholder="mot de passe actuel"
            secureTextEntry={true}
            onChangeText={(password) =>
              this._passwordTextInputChanged(password)
            }
          />
          <Text style={[styles.text]}>Nouveau mot de passe:</Text>
          <TextInput
            style={[styles.textinput, {marginTop: 20}]}
            placeholder="nouveau mot de passe"
            onChangeText={(newPassword) =>
              this._newPasswordTextInputChanged(newPassword)
            }
          />
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#0084d1'}]}
            onPress={() => this._updatePassword()}>
            <Text>modifier mon mot de passe</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#000000'}]}
            onPress={() => this.setState({updatePasswordModal: false})}>
            <Text style={{color: '#ffffff'}}>Annuler</Text>
          </TouchableOpacity>
          </ScrollView>
        </Modal>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.secondary}]}
          onPress={() => this._askDeconnexion()}>
          <Text>déconnexion</Text>
        </TouchableOpacity>
        <Modal visible={this.state.deconnexionModal}>
          <ScrollView>
          <Text style={[styles.text]}>
            Voulez vous vraiment vous déconnecter ?
          </Text>
          <TouchableOpacity
              style={[styles.button, {backgroundColor: '#de0404'}]}
              onPress={() => this._logOut()}>
            <Text>Se déconnecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.button, {backgroundColor: '#000000'}]}
              onPress={() => this.setState({deconnexionModal: false})}>
            <Text style={{color: '#ffffff'}}>Annuler</Text>
          </TouchableOpacity>
          </ScrollView>
        </Modal>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: theme.secondary}]}
          onPress={() => this._askDeleteAccount()}>
          <Text>supprimer compte</Text>
        </TouchableOpacity>
        <Modal visible={this.state.deleteAccountModal}>
          <ScrollView>
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
            style={[styles.button, {backgroundColor: '#de0404'}]}
            onPress={() => this._deleteAccount()}>
            <Text>Supprimer mon compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#000000'}]}
            onPress={() => this.setState({deleteAccountModal: false})}>
            <Text style={{color: '#ffffff'}}>Annuler</Text>
          </TouchableOpacity>
          </ScrollView>
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
  textinput: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    height: 50,
    borderRadius: 4,
    borderWidth: 1,
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
