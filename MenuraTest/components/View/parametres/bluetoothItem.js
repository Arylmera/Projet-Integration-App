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

   /**
    * Connection à l'appareil
    */
   connect_to_device() {
      this.state.device
         .connect()
         .then((device) => {
            this.setState({status_diplay: 'connection'});
            return device.discoverAllServicesAndCharacteristics();
         })
         .then((device) => {
            this.setState({connected: true});
            this.setState({status_diplay: 'connecté'});
            console.log(device);
         })
         .catch((error) => {
            this.setState({status_diplay: 'déconnecté'});
            console.log(error);
         });
   }

   /**
    * déconnexion de l'appareil
    */
   disconnect_from_device() {
      console.log('handle disconnection');
   }

   /**
    * render
    * @return {JSX.Element}
    */
   render() {
      let theme = this.props.currentStyle;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <Icon name="bluetooth" size={18} color={theme.highlight} />
            <Text style={[styles.device_name, {color: theme.highlight}]}>
               {this.state.device.name}
            </Text>
            <View style={styles.flex_item_size_helper} />
            <View
               style={[
                  styles.connect_container,
                  {backgroundColor: theme.accent},
               ]}>
               {this.state.connected ? (
                  <TouchableOpacity
                     style={[styles.connect_button]}
                     onPress={this.disconnect_from_device.bind(this)}>
                     <View style={styles.connect_button_helper}>
                        <Text
                           style={[
                              styles.connect_status_text,
                              {color: theme.highlight},
                           ]}>
                           {this.state.status_diplay}
                        </Text>
                        <Icon name="done" size={18} color={theme.highlight} />
                     </View>
                  </TouchableOpacity>
               ) : (
                  <TouchableOpacity
                     style={[styles.connect_button]}
                     onPress={this.connect_to_device.bind(this)}>
                     <View style={styles.connect_button_helper}>
                        <Text
                           style={[
                              styles.connect_status_text,
                              {color: theme.highlight},
                           ]}>
                           {this.state.status_diplay}
                        </Text>
                        <Icon name="clear" size={18} color={theme.primary} />
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
      padding: 7,
      margin: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 1,
   },
   flex_item_size_helper: {
      flex: 1,
   },
   Title: {
      flex: 1,
   },
   device_name: {
      flex: 2,
      marginLeft: 15,
   },
   connect_container: {
      flex: 2,
      alignItems: 'center',
      borderRadius: 5,
      padding: 1,
   },
   connect_button_helper: {
      flex: 1,
      flexDirection: 'row',
   },
   connect_status_text: {
      marginRight: 5,
      marginLeft: 5,
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
