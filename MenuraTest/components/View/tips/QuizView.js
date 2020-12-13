import React from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
   Modal,
   ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import QuizItem from './QuizItem';
import question from './data/QuizData';
import Icon from 'react-native-vector-icons/MaterialIcons';

class QuizView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         questions: 0,
         score: 0,
         scoreModal: false,
         scoreText: '',
      };
   }

   /**
    * modification du score et du compteur de questions
    * @param val
    */
   changeScore(val) {
      let questions = this.state.questions;
      let score = this.state.score;
      questions++;
      score += val;
      this.setState({
         questions: questions,
         score: score,
      });
      this._terminerQuiz();
   }

   /**
    * activer le modal de fin de quiz si on est à la fin
    * @private
    */
   _terminerQuiz() {
      if (this.state.questions === 9) {
         if (this.state.score >= 8) {
            this.setState({
               scoreModal: true,
               scoreText: 'Bravo !',
            });
         } else if (this.state.score >= 5) {
            this.setState({
               scoreModal: true,
               scoreText: 'Pas trop mal !',
            });
         } else if (this.state.score < 5) {
            this.setState({
               scoreModal: true,
               scoreText: 'Entrainez vous encore !',
            });
         }
      }
   }

   /**
    * render
    * @return {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      const {navigation} = this.props;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View style={[styles.context, {backgroundColor: theme.accent}]}>
               <TouchableOpacity
                  style={styles.touchableOpacity}
                  onPress={() => navigation.navigate('TipsView', {})}>
                  <Icon
                     name="keyboard-arrow-left"
                     size={35}
                     color={theme.highlight}
                  />
               </TouchableOpacity>
               <Text
                  style={[
                     styles.list_header,
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}>
                  C'est parti !
               </Text>
            </View>
            <FlatList
               data={question}
               style={styles.FlatlistItem}
               keyExtractor={(item) => item.id}
               renderItem={({item}) => (
                  <QuizItem
                     data={{question: item, root: 'QuizView'}}
                     changeScore={this.changeScore.bind(this)}
                  />
               )}
            />
            <Modal visible={this.state.scoreModal}>
               <ScrollView
                  style={[styles.score_view, {backgroundColor: theme.primary}]}>
                  <Text
                     style={[
                        styles.text,
                        {color: theme.highlight, fontSize: 18},
                     ]}>
                     Vous avez réalisé un score de {this.state.score}/10
                  </Text>
                  <Text
                     style={[
                        styles.text,
                        {color: theme.highlight, fontSize: 18},
                     ]}>
                     {this.state.scoreText}
                  </Text>
                  <View styles={styles.score_button_bloc}>
                     <TouchableOpacity
                        style={[
                           styles.button,
                           styles.score_button,
                           {backgroundColor: theme.accent, marginTop: 50},
                        ]}
                        onPress={() => navigation.navigate('TipsView')}>
                        <Text style={{color: theme.highlight}}>Quitter</Text>
                     </TouchableOpacity>
                  </View>
               </ScrollView>
            </Modal>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
      flexDirection: 'column',
   },
   context: {
      textAlign: 'center',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   list_header: {
      fontSize: 18,
      fontWeight: 'bold',
      marginLeft: '10%',
   },
   FlatlistItem: {
      flex: 1,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
   },
   score_view: {
      padding: 20,
      paddingTop: 30,
   },
   text: {
      marginLeft: 5,
      marginRight: 5,
      marginTop: 40,
   },
   button: {
      flex: 1,
      padding: 5,
      margin: 5,
      marginLeft: 'auto',
      borderRadius: 4,
      width: '50%',
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
   },
   score_button: {
      flex: 1,
   },
   score_button_bloc: {
      width: '100%',
      flexDirection: 'column',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <QuizView {...props} navigation={navigation} />;
});
