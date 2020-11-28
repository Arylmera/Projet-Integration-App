import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import firebase from "firebase";

class HeaderIcon extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         headerIcon: require('../assets/images/profileIcon.png'),
      };
   }

   componentDidMount() {
      this._checkIfLoggedIn();
   }

   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            let avatar = user.photoURL;
            this.setState({headerIcon: avatar});
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   render() {
      const {navigation} = this.props;
      return (
         <View style={styles.headerIcon}>
            <TouchableOpacity
               style={{marginRight: 5}}
               onPress={() => {
                  navigation.dispatch(CommonActions.navigate('Profil'));
               }}>
               <Image
                  source={this.state.headerIcon}
                  style={styles.profileIcon}
               />
            </TouchableOpacity>
         </View>
      );
   }
}

let styles = StyleSheet.create({
   headerIcon: {
      flexDirection: 'row',
      alignItems: 'center',
   },
   profileIcon: {
      borderRadius: 100,
      width: 40,
      height: 40,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <HeaderIcon {...props} navigation={navigation} />;
});
