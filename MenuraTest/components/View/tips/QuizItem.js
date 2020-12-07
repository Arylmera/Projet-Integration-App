

import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

class QuizItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         reponse1: this.props.data.question.reponse1,
         reponse2: this.props.data.question.reponse2,
         reponse3: this.props.data.question.reponse3,
         reponse4: this.props.data.question.reponse4,
         reponseCorrecte: this.props.data.question.reponseCorrecte,
         image: this.props.data.question.image,
         helperText: ' ',
         helperTextColor: 'red',
         backColor: this.props.currentStyle.secondary,
         disable: false,
         opacity: 1,
      };
   }

   /**
    * vérification de la réponse
    * @param reponse
    * @private
    */
   _checkResponse(reponse) {
      if (reponse === this.state.reponseCorrecte) {
         console.log('correct !');
         this.setState({
            helperText: 'Bien joué !',
            helperTextColor: 'green',
            backColor: '#bce0b4',
            disable: true,
            opacity: 0.4,
         });
      } else {
         console.log('faux !');
         this.setState({
            helperText: 'mauvaise réponse !',
            helperTextColor: 'red',
            backColor: '#e09f99',
            disable: true,
            opacity: 0.4,
         });
      }
   }

   /**
    * render
    * @return {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      return (
         <View
            style={[
               styles.main_container,
               {backgroundColor: this.state.backColor},
            ]}>
            <Image
               style={[styles.image, {opacity: this.state.opacity}]}
               source={this.state.image}
            />
            <TouchableOpacity
               disabled={this.state.disable}
               style={[
                  styles.button,
                  {backgroundColor: theme.accent, opacity: this.state.opacity},
               ]}
               onPress={() => this._checkResponse(this.state.reponse1)}>
               <Text>{this.state.reponse1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
               disabled={this.state.disable}
               style={[
                  styles.button,
                  {backgroundColor: theme.accent, opacity: this.state.opacity},
               ]}
               onPress={() => this._checkResponse(this.state.reponse2)}>
               <Text>{this.state.reponse2}</Text>
            </TouchableOpacity>

            <TouchableOpacity
               disabled={this.state.disable}
               style={[
                  styles.button,
                  {backgroundColor: theme.accent, opacity: this.state.opacity},
               ]}
               onPress={() => this._checkResponse(this.state.reponse3)}>
               <Text>{this.state.reponse3}</Text>
            </TouchableOpacity>
            <TouchableOpacity
               disabled={this.state.disable}
               style={[
                  styles.button,
                  {backgroundColor: theme.accent, opacity: this.state.opacity},
               ]}
               onPress={() => this._checkResponse(this.state.reponse4)}>
               <Text>{this.state.reponse4}</Text>
            </TouchableOpacity>
            <Text style={[styles.helper, {color: this.state.helperTextColor}]}>
               {this.state.helperText}
            </Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      height: 375,
      flexDirection: 'column',
      margin: 10,
      borderRadius: 5,
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   image: {
      resizeMode: 'contain',
      height: '50%',
      width: '100%',
      marginTop: 5,
   },
   button: {
      borderRadius: 5,
      marginLeft: 0,
      marginRight: 0,
      width: '60%',
      marginBottom: 5,
      marginTop: 5,
      padding: 5,
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
   },
   helper: {
      fontSize: 16,
      marginTop: 5,
      fontWeight: 'bold',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <QuizItem {...props} navigation={navigation} />;
});
