'use strict'

import React from 'react';
import {
   StyleSheet,
   View,
   Text,
   TextInput,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import firebase from 'firebase';

class ResetPasswordProfilView extends React.Component {
   constructor(props) {
      super(props);
      this.email = '';
      this.errorBorderColor = '#c20000';
      this.normalBorderColor = '#b8b8b8';
      this.focusBorderColor = '#000000';
      this.state = {
         errorMessage: '',
         borderEmail: this.normalBorderColor,
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
            navigation.navigate('connexion');
         })
         .catch((error) => {
            console.error(error);
            this.setState({
               errorMessage: error.message,
               borderEmail: this.errorBorderColor,
            });
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
               <Text style={styles.errorText}>{this.state.errorMessage}</Text>
               <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._resetPassword(this.email, navigation)}>
                  <Text>Reset par email</Text>
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

   return <ResetPasswordProfilView {...props} navigation={navigation} />;
});
