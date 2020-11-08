import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import DetailItem from '../details/detailItem';
import {connect} from 'react-redux';
import firebase from "firebase";

class HistoriqueView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      oiseauxListe: [
        'Mésange',
        'Pic vert',
        'Moineau',
        'Bergeronnette grise',
        'Buse variable',
        'Chardonneret élégant',
        'Bruant Jaune',
        'Paridae',
      ],
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
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <FlatList
          data={this.state.oiseauxListe}
          style={styles.FlatlistItem}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <DetailItem data={{oiseau_nom: item, root: 'HistoriqueView'}} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    paddingTop: 10,
    flexDirection: 'column',
  },
  detailButton: {
    borderRadius: 5,
    width: '25%',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(126,211,33,0.5)',
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
