import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import firebase from "firebase";
import {connect} from "react-redux";

class StatsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
    };
  }

  componentDidMount() {
    this._checkIfLoggedIn();
  }

  _checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({id: user.uid})
      } else {
        console.log("no user")
      }
    });
  }

  render() {
    return (
      <View style={styles.main_container}>
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
