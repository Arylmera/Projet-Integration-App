import React from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import DetailItem from '../details/detailItem';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {getHistoriqueByID} from '../../../api/historique_api';

class HistoriqueView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oiseauxListe: [],
    };
  }

  componentDidMount() {
    this._checkIfLoggedIn();
  }

  _checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this._load_user_historique(user);
      } else {
        console.log('no user');
      }
    });
  }

  _load_user_historique(user) {
    console.log('loading user historique for user : ' + user.uid);
    user.getIdToken(true).then((idToken) => {
      getHistoriqueByID(user.uid, idToken).then((data) =>
        console.log(data),
      );
    });
    this.setState({oiseauxListe: ['mésange']});
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        {this.state.user_id !== '' ? (
          <View style={[styles.condition_container]}>
            <Text
              style={[
                styles.list_header,
                {backgroundColor: theme.secondary, color: theme.highlight},
              ]}>
              Liste des oiseaux détecté par votre capteur
            </Text>
            <FlatList
              data={this.state.oiseauxListe}
              style={styles.FlatlistItem}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <DetailItem data={{oiseau_nom: item, root: 'HistoriqueView'}} />
              )}
            />
          </View>
        ) : (
          <View style={[styles.condition_container]}>
            <Text> Please be logged and have at lease one bird </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  condition_container: {
    flex: 1,
    flexDirection: 'column',
  },
  list_header: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
  },
  detailButton: {
    borderRadius: 5,
    width: '25%',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  FlatlistItem: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(HistoriqueView);
