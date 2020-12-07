import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import firebase from 'firebase';

class AvatarItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         img: this.props.data.avatar.img,
      };
   }

   /**
    * modification de l'avatar
    * @private
    */
   _updateAvatar() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            user
               .updateProfile({
                  photoURL: this.state.img,
               })
               .then(() => {
                  this.props.navigation.navigate('modificationProfil');
               })
               .catch(function (error) {
                  console.log(error);
               });
         } else {
            this.props.navigation.navigate('connexion');
         }
      });
   }

   /**
    * render
    * @returns {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <TouchableOpacity
               onPress={() => {
                  this._updateAvatar();
               }}>
               <Image style={styles.image} source={this.state.img} />
            </TouchableOpacity>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flexDirection: 'column',
      margin: 10,
      borderRadius: 10,
      alignItems: 'center',
   },
   image: {
      resizeMode: 'contain',
      borderRadius: 10,
      height: 150,
      width: 150,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <AvatarItem {...props} navigation={navigation} />;
});
