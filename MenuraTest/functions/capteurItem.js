import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';

class Capteur_Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capteur: this.props.data.capteur,
    };
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.accent}]}>
        <Text style={[styles.capteur_id, {color: theme.highlight}]}>Capteur numéro : {this.state.capteur.id}</Text>
        <Text style={[styles.capteur_name, {color: theme.highlight}]}>Nom : {this.state.capteur.name}</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  capteur_id: {
    flex: 1,
  },
  capteur_name: {
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(Capteur_Item);
