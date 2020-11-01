import React from 'react';
import {StyleSheet, View, Text, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {BleManager} from 'react-native-ble-plx';
import BlueTooth_Item from './bluetoothItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Divider} from 'react-native-paper';

class Bluetooth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status_text: 'Aucun appreil bluetooth détecté',
      bl_manager: null,
      bl_device_list: [],
    };
  }

  componentDidMount() {
    this.state.bl_manager = new BleManager();
    this.scan_device();
  }

  componentWillUnmount() {
    this.state.bl_manager.destroy();
  }

  scan_device() {
    this.setState({status_text: 'Scan des appareils Bluetooth en cours'});
    this.setState({bl_device_list: []});
    this.state.bl_manager = new BleManager();
    console.log('searching Bluetooth devices');
    const subscription = this.state.bl_manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scan_bluetooth_device();
        subscription.remove();
        console.log(this.state.bl_device_list);
      }
    }, true);
  }

  scan_bluetooth_device() {
    this.state.bl_manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('error on bluetooth device scanning');
      } else {
        if (device.name != null) {
          let already_found = false;
          this.state.bl_device_list.forEach((e) => {
            console.log(e.name);
            if (e.name === device.name) {
              already_found = true;
            }
          });
          if (!already_found) {
            this.setState({
              bl_device_list: this.state.bl_device_list.concat(device),
            });
          }
        }
      }
    });
  }

  render() {
    let theme = this.props.currentStyle;
    return (
      <View style={styles.container}>
        <View style={[styles.container_header]}>
          <Text style={(styles.title, [{color: theme.highlight}])}>
            Recherche d'appareils bluetooth
          </Text>
          <TouchableOpacity
            onPress={this.scan_device.bind(this)}
            style={[styles.refresh_button, {backgroundColor: theme.accent}]}>
            <View style={[styles.refresh_content_helper]}>
              <Icon
                name="refresh"
                size={18}
                color={theme.highlight}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              />
              <Text
                style={
                  (styles.refresh_button_text, [{color: theme.highlight}])
                }>
                rafraichir
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Divider />
        <View style={styles.bl_device_list}>
          {this.state.bl_device_list.length > 0 ? (
            <FlatList
              data={this.state.bl_device_list}
              style={styles.FlatlistItem}
              keyExtractor={(item) => item}
              renderItem={({item}) => (
                <BlueTooth_Item
                  disconnectDevice={this.disconnect_devices}
                  data={{
                    device: item,
                    connected: this.state.bl_manager.isDeviceConnected(item.id),
                  }}
                />
              )}
            />
          ) : (
            <Text
              style={[styles.bl_device_list_unknown, {color: theme.highlight}]}>
              {this.state.status_text}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    flexDirection: 'column',
  },
  container_header: {
    flex: 1,
    alignItems: 'center',
  },
  bl_device_list: {
    flex: 3,
    marginTop: 15,
  },
  bl_device_list_unknown: {
    flex: 1,
    textAlign: 'center',
  },
  FlatlistItem: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  refresh_content_helper: {
    flexDirection: 'row',
  },
  refresh_button: {
    padding: 5,
    marginTop: 5,
    borderRadius: 5,
  },
  refresh_button_text: {
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    currentStyle: state.currentStyle,
  };
};

export default connect(mapStateToProps)(Bluetooth);
