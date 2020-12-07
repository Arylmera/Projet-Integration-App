'use strict'

import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import QuizItem from './QuizItem';
import question from './data/QuizData';
import Icon from 'react-native-vector-icons/MaterialIcons';

class QuizView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

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
                  <QuizItem data={{question: item, root: 'QuizView'}} />
               )}
            />
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
