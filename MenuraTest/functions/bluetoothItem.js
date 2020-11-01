import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

class BlueTooth_Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: this.props.data.device,
      connected: false,
      status_diplay: 'déconnecté',
    };
  }

  connect_to_device() {
    this.state.device
      .connect()
      .then((device) => {
        console.log('connecting to device : ' + device.name);
        this.setState({status_diplay: 'connection'});
        return device.discoverAllServicesAndCharacteristics();
      })
      .then((device) => {
        console.log('connected to device : ' + device.name);
        this.setState({connected: true});
        this.setState({status_diplay: 'connecté'});
        console.log(device);
      })
      .catch((error) => {
        this.setState({status_diplay: 'déconnecté'});
        console.log(error);
      });
  }

  disconnect_from_device() {
    console.log('handle disconnection');
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.accent}]}>
        <Text style={[{color: theme.highlight}]}>{this.state.device.name}</Text>
        <View style={styles.connect_container}>
          {this.state.connected ? (
            <TouchableOpacity
              style={[styles.connect_button]}
              onPress={this.disconnect_from_device.bind(this)}>
              <View style={styles.connect_button_helper}>
                <Icon name="bluetooth" size={18} color={theme.highlight} />
                <Text style={[{color: theme.highlight}]}>
                  {this.state.status_diplay}
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.connect_button]}
              onPress={this.connect_to_device.bind(this)}>
              <View style={styles.connect_button_helper}>
                <Icon name="bluetooth" size={18} color={theme.highlight} />
                <Text style={[{color: theme.highlight}]}>
                  {this.state.status_diplay}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
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
  Title: {
    flex: 1,
  },
  connect_container: {
    flex: 1,
  },
  connect_button_helper: {
    flex: 1,
    flexDirection: 'row',
  },
  connect_button: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(BlueTooth_Item);
