import React from 'react';
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
import niche from './data/TipsDataNiche';
import TipsNicheItem from './TipsNicheItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

class TipsNiche extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      const {navigation} = this.props;
      let theme = this.props.currentStyle;
      return (
         <View style={{backgroundColor: theme.primary, flex: 1}}>
            <View style={[styles.context, {backgroundColor: theme.accent}]}>
               <TouchableOpacity
                  style={styles.back_button}
                  onPress={() =>
                     navigation.navigate('TipsView', {
                        oiseaux_nom: this.state.nom,
                     })
                  }>
                  <Icon
                     name="keyboard-arrow-left"
                     size={35}
                     color={theme.highlight}
                  />
               </TouchableOpacity>
               <Text
                  style={[
                     styles.list_header,
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}>
                  Idées de constructions de niches :
               </Text>
            </View>
            <FlatList
               data={niche}
               keyExtractor={(item) => item.id}
               renderItem={({item}) => (
                  <TipsNicheItem data={{niche: item, root: 'TipsNiche'}} />
               )}
            />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   context: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },

   list_header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 10,
      fontWeight: 'bold',
   },
   main_container: {
      height: 190,
      flexDirection: 'row',
      margin: 10,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   image: {
      width: 120,
      height: 180,
      margin: 5,
   },
   content_container: {
      flex: 1,
      margin: 5,
   },
   header_container: {
      flex: 3,
      flexDirection: 'row',
   },
   title_text: {
      fontWeight: 'bold',
      fontSize: 18,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5,
   },
   description_container: {
      flex: 7,
   },
   description_text: {
      fontStyle: 'italic',
      color: '#666666',
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <TipsNiche {...props} navigation={navigation} />;
});
