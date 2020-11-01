import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';

class ResetPasswordProfilView extends React.Component {
  constructor(props) {
    super(props);
    this.email = '';
    this.state = {};
  }

  _emailTextInputChanged(email) {
    this.email = email;
  }

  _resetPassword(email, navigation) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('email sent');
        navigation.navigate('modificationProfil');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert(error.toString());
      });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.main_container}>
        <TextInput
          style={[styles.textinput]}
          placeholder="email"
          onChangeText={(email) => this._emailTextInputChanged(email)}
        />
        <TouchableOpacity
          style={styles.modifButton}
          onPress={() => this._resetPassword(this.email, navigation)}>
          <Text>Reset par email</Text>
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
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();

  return <ResetPasswordProfilView {...props} navigation={navigation} />;
});