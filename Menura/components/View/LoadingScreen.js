import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._checkIfLoggedIn();
  }

  _checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('Views');
      } else {
        this.props.navigation.navigate('Profil');
      }
    });
  }

  render() {
    return (
      <View style={[styles.main_container, {backgroundColor: '#d9d3b6'}]}>
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require('../../assets/images/Accueil.png')}>
          <Text style={styles.text}>Menura</Text>
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#0b4200"
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    padding: 0,
  },
  loading: {
    marginTop: 150,
  },
  text: {
    letterSpacing: 1,
    textShadowColor: '#bf770a',
    textShadowRadius: 50,
    textShadowOffset: {width: -1, height: -1},
    marginTop: 75,
    color: '#754600',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 50,
    opacity: 0.4,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    height: '100%',
    width: '105%',
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(function (props) {
  const navigation = useNavigation();

  return <LoadingScreen {...props} navigation={navigation} />;
});
