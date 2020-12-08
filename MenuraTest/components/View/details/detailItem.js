import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {connect} from 'react-redux';

class DetailItem extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      const nom = this.props.data.oiseau.nom.replace('_', ' ');
      const espece = this.props.data.oiseau.espece;
      const {navigation} = this.props;
      let theme = this.props.currentStyle;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.secondary}]}>
            <TouchableOpacity
               style={styles.touchableOpacity}
               onPress={() =>
                  navigation.navigate('DetailOiseaux', {
                     oiseaux_nom: nom,
                     root: this.props.data.root,
                  })
               }>
               <Text style={[styles.nom, {color: theme.highlight}]}>{nom}</Text>
               <Text style={[styles.espece, {color: theme.accent}]}>
                  {espece}
               </Text>
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
   nom: {
      fontSize: 30,
      fontWeight: 'bold',
   },
   espece: {
      fontSize: 18,
      fontWeight: 'bold',
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
   return <DetailItem {...props} navigation={navigation} />;
});
