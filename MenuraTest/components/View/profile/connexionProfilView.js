import React from 'react';
import {
   StyleSheet,
   View,
   TextInput,
   Text,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';

class ConnexionProfilView extends React.Component {
   constructor(props) {
      super(props);
      this.email = '';
      this.password = '';
      this.errorBorderColor = '#c20000';
      this.normalBorderColor = '#b8b8b8';
      this.focusBorderColor = '#000000';
      this.state = {
         errorMessage: '',
         borderEmail: this.normalBorderColor,
         borderPassword: this.normalBorderColor,
      };
   }

   _emailTextInputChanged(email) {
      this.email = email;
   }

   _passwordTextInputChanged(password) {
      this.password = password;
   }

   _signIn(email, password) {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(() => {
            console.log('User signed in!');
            this.setState({
               errorMessage: '',
               borderEmail: this.normalBorderColor,
               borderPassword: this.normalBorderColor,
            });
            this._verifierEmailConfirme();
         })
         .catch((error) => {
            console.error(error);
            this.setState({
               errorMessage: error.message,
               borderEmail: this.errorBorderColor,
               borderPassword: this.errorBorderColor,
            });
         });
   }

   _verifierEmailConfirme() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user && user.emailVerified) {
            this.props.navigation.navigate('views');
         } else {
            this.props.navigation.navigate('verificationEmail');
         }
      });
   }

   render() {
      const {navigation} = this.props;
      return (
         <ScrollView>
            <View style={styles.main_container}>
               <TextInput
                  style={[
                     styles.textInput,
                     {borderColor: this.state.borderEmail},
                  ]}
                  placeholder="email"
                  keyboardType="email-address"
                  autoCapitalize={'none'}
                  onChangeText={(email) => this._emailTextInputChanged(email)}
                  onFocus={() =>
                     this.setState({borderEmail: this.focusBorderColor})
                  }
                  onBlur={() =>
                     this.setState({borderEmail: this.normalBorderColor})
                  }
               />
               <TextInput
                  style={[
                     styles.textInput,
                     {borderColor: this.state.borderPassword},
                  ]}
                  placeholder="mot de passe"
                  secureTextEntry={true}
                  autoCapitalize={'none'}
                  onChangeText={(password) =>
                     this._passwordTextInputChanged(password)
                  }
                  onFocus={() =>
                     this.setState({borderPassword: this.focusBorderColor})
                  }
                  onBlur={() =>
                     this.setState({borderPassword: this.normalBorderColor})
                  }
               />
               <Text style={styles.errorText}>{this.state.errorMessage}</Text>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._signIn(this.email, this.password)}>
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
            </View>
         </ScrollView>
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
      color: '#c20000',
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
