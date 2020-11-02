import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';

class ResetPasswordProfilView extends React.Component {
  constructor(props) {
    super(props);
    this.email = '';
    this.state = {
      errorMessage: "",
      borderEmail: "#b8b8b8"
    };
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
        this.setState({errorMessage: error.message, borderEmail: '#c20000'})
      });
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.main_container}>
        <TextInput
          style={[styles.textInput, {borderColor: this.state.borderEmail}]}
          placeholder="email"
          onChangeText={(email) => this._emailTextInputChanged(email)}
          onFocus={() => this.setState({borderEmail: '#000000'})}
          onBlur={() => this.setState({borderEmail: '#b8b8b8'})}
        />
        <Text
            style={styles.errorText}
        >
          {this.state.errorMessage}
        </Text>
        <TouchableOpacity
          style={styles.button}
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
