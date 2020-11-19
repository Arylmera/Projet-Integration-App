import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {LogBox} from 'react-native';

class HistoriqueItem extends React.Component {
   constructor(props) {
      LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
      super(props);
      this.state = {};
   }

   render() {
      const oiseaux = this.props.data.oiseau;
      const {navigation} = this.props;
      let theme = this.props.currentStyle;
      console.log(oiseaux);
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.secondary}]}>
            <TouchableOpacity
               style={styles.touchableOpacity}
               onPress={() =>
                  navigation.navigate('DetailOiseaux', {
                     oiseaux_nom: oiseaux.oiseau,
                     root: this.props.data.root,
                  })
               }>
               <Text style={[styles.Title, {color: theme.highlight}]}>
                  {oiseaux.oiseau}
               </Text>
               <View
                  style={[styles.info_bloc, {backgroundColor: theme.primary}]}>
                  {oiseaux.date ? (
                     <View style={styles.info_line}>
                        <Icon
                           name="query-builder"
                           size={18}
                           color={theme.highlight}
                           style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingRight: 10,
                           }}
                        />
                        <Text style={[styles.date, {color: theme.highlight}]}>
                           Date: {oiseaux.date}
                        </Text>
                     </View>
                  ) : (
                     <View style={styles.info_line}>
                        <Icon
                           name="query-builder"
                           size={18}
                           color={theme.highlight}
                           style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingRight: 10,
                           }}
                        />
                        <Text style={[styles.date, {color: theme.highlight}]}>
                           Aucune date disponible
                        </Text>
                     </View>
                  )}
                  {oiseaux.localisation ? (
                     <View style={styles.info_line}>
                        <Icon
                           name="home"
                           size={18}
                           color={theme.highlight}
                           style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingRight: 10,
                           }}
                        />
                        <Text
                           style={[
                              styles.localisation,
                              {color: theme.highlight},
                           ]}>
                           Localisation: {oiseaux.localisation}
                        </Text>
                     </View>
                  ) : (
                     <View style={styles.info_line}>
                        <Icon
                           name="hearing"
                           size={18}
                           color={theme.highlight}
                           style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingRight: 10,
                           }}
                        />
                        <Text
                           style={[
                              styles.localisation,
                              {color: theme.highlight},
                           ]}>
                           Aucun emplacement disponible
                        </Text>
                     </View>
                  )}
                  <View style={styles.info_line}>
                     <Icon
                        name="audiotrack"
                        size={18}
                        color={theme.highlight}
                        style={{
                           justifyContent: 'center',
                           alignItems: 'center',
                           paddingRight: 10,
                        }}
                     />
                     <Text style={[styles.capteur, {color: theme.highlight}]}>
                        Capteur: {oiseaux.capteur}
                     </Text>
                  </View>
               </View>
            </TouchableOpacity>
         </View>
      );
   }
}

let styles = StyleSheet.create({
   main_container: {
      flex: 1,
      margin: 5,
      padding: 5,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   info_bloc: {
      marginTop: 15,
      padding: 10,
      borderRadius: 5,
      paddingLeft: 35,
      paddingRight: 35,
   },
   info_line: {
      flexDirection: 'row',
   },
   Title: {
      fontSize: 30,
      fontWeight: 'bold',
   },
   date: {
      fontSize: 15,
   },
   localisation: {
      fontSize: 15,
   },
   capteur: {
      fontSize: 15,
   },
   touchableOpacity: {
      borderRadius: 5,
      marginLeft: 'auto',
      width: '100%',
      padding: 3,
      alignItems: 'center',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <HistoriqueItem {...props} navigation={navigation} />;
});
