import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {getDataStorage} from '../../../functions/storageHelper';

class StatsView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         id: '',
      };
   }

   componentDidMount() {
      this._checkIfLoggedIn();
      this._reloadTheme();
   }

   _checkIfLoggedIn() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.setState({id: user.uid});
         } else {
            console.log('no user');
         }
      });
   }

   _reloadTheme() {
      getDataStorage('theme_key').then((r) => {
         if (r !== null) {
            if (r === 'winterStyle') {
               const action = {type: 'SET_WINTER'};
               this.props.dispatch(action);
            } else if (r === 'autumnStyle') {
               const action = {type: 'SET_AUTUMN'};
               this.props.dispatch(action);
            } else if (r === 'springStyle') {
               const action = {type: 'SET_SPRING'};
               this.props.dispatch(action);
            } else if (r === 'summerStyle') {
               const action = {type: 'SET_SUMMER'};
               this.props.dispatch(action);
            }
         }
      });
   }

   render() {
      let theme = this.props.currentStyle;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <Text>Stats Works</Text>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(StatsView);
