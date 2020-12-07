import React from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
   SafeAreaView,
} from 'react-native';
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

   /**
    * au chagrgement du component
    */
   componentDidMount() {
      this.state.bl_manager = new BleManager();
      this.scan_device();
   }

   /**
    * au changement de view
    */
   componentWillUnmount() {
      this.state.bl_manager.destroy();
   }

   /**
    * scan des appareils blueTooth à portée
    */
   scan_device() {
      this.setState({status_text: 'Scan des appareils Bluetooth en cours'});
      this.setState({bl_device_list: []});
      this.state.bl_manager = new BleManager();
      const subscription = this.state.bl_manager.onStateChange((state) => {
         if (state === 'PoweredOn') {
            this.scan_bluetooth_device();
            subscription.remove();
         }
      }, true);
   }

   /**
    * scan des appareils blueTooth à portée
    */
   scan_bluetooth_device() {
      this.state.bl_manager.startDeviceScan([], null, (error, device) => {
         if (error) {
            console.log(error);
         } else {
            if (device.name != null) {
               let already_found = false;
               this.state.bl_device_list.forEach((e) => {
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

   /**
    * render
    * @return {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      return (
         <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
               <View style={[styles.container_header]}>
                  <Text style={[styles.title, {color: theme.highlight}]}>
                     Recherche d'appareils bluetooth
                  </Text>
                  <TouchableOpacity
                     onPress={this.scan_device.bind(this)}
                     style={[
                        styles.refresh_button,
                        {backgroundColor: theme.accent},
                     ]}>
                     <View style={[styles.refresh_content_helper]}>
                        <Icon
                           name="sync"
                           size={18}
                           color={theme.highlight}
                           style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginLeft: 5,
                           }}
                        />
                        <Text
                           style={[
                              styles.refresh_button_text,
                              {color: theme.highlight},
                           ]}>
                           rafraichir
                        </Text>
                     </View>
                  </TouchableOpacity>
               </View>
               <Divider
                  style={[styles.divider, {backgroundColor: theme.highlight}]}
               />
               <View style={styles.bl_device_list}>
                  {this.state.bl_device_list.length > 0 ? (
                     <FlatList
                        data={this.state.bl_device_list}
                        style={styles.FlatlistItem}
                        keyExtractor={(item) => item.name}
                        renderItem={({item}) => (
                           <BlueTooth_Item
                              data={{
                                 device: item,
                              }}
                           />
                        )}
                     />
                  ) : (
                     <Text
                        style={[
                           styles.bl_device_list_unknown,
                           {color: theme.highlight},
                        ]}>
                        {this.state.status_text}
                     </Text>
                  )}
               </View>
            </View>
         </SafeAreaView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      paddingTop: 10,
      flex: 1,
      minHeight: 150,
      flexDirection: 'column',
   },
   divider: {
      margin: 0,
      padding: 0,
   },
   container_header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   bl_device_list: {
      flex: 3,
      marginTop: 10,
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
      marginBottom: 5,
   },
   refresh_content_helper: {
      flexDirection: 'row',
   },
   refresh_button: {
      padding: 5,
      marginTop: 5,
      marginBottom: 5,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
   },
   refresh_button_text: {
      textAlign: 'center',
      marginLeft: 10,
      marginRight: 10,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(Bluetooth);
