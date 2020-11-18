import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {deleteCapteur} from '../api/capteur_api';
import Icon from 'react-native-vector-icons/MaterialIcons';

class Capteur_Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updater: false,
      user: this.props.data.user,
      capteur: this.props.data.capteur,
    };
  }

  componentDidMount() {
    this.reload_item();
  }

  reload_item() {
    this.setState({updater: !this.state.updater});
  }

  /**
   * suppression du capteur dans la db par requete POST
   * @private
   */
  _delete_capteur() {
    this.state.user.getIdToken(true).then((idToken) => {
      deleteCapteur(idToken, this.state.capteur.macAddress).then(() => {
        this.props.reload_list();
      });
    });
  }

  /**
   * render
   * @return {JSX.Element}
   */
  render() {
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <View style={[styles.capteur_id]}>
          <Text style={[styles.capteur_id_text, {color: theme.highlight}]}>
            Capteur
          </Text>
          <Text style={[styles.capteur_id_adresse, {color: theme.highlight}]}>
            {this.state.capteur.macAddress}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this._delete_capteur.bind(this)}
          style={[styles.deleteButton, {backgroundColor: theme.accent}]}>
          <View style={styles.delete}>
            <Text style={[styles.capteur_delete_text, {color: theme.highlight}]}>
              Supprimer
            </Text>
            <Icon name="delete-forever" size={18} color={theme.highlight} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    padding: 7,
    margin: 5,
    // shadow
    shadowColor: 'rgba(0,0,0, .7)',
    shadowOffset: {height: 0, width: 0},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
  capteur_id: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  capteur_id_text: {
    flex: 1,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capteur_id_adresse: {
    flex: 2,
    fontSize: 14,
  },
  delete: {
    flex: 1,
    flexDirection: 'row',
  },
  capteur_changeAddress: {
    flex: 1,
  },
  deleteButton: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  capteur_delete_text: {
    marginLeft: 3,
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(Capteur_Item);
