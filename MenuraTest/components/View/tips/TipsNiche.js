import React from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/core';

class TipsNiche extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
      this.nichoire = [
         {
            id: '1',
            title: '',
            description: '',
            image: '',
         },
      ];
   }

   render() {
      let theme = this.props.currentStyle;
      return (
         <ScrollView style={{backgroundColor: theme.primary, flex: 1}}>
            <View>
               <View style={[styles.context, {backgroundColor: theme.accent}]}>
                  <Text
                     style={[
                        styles.list_header,
                        {backgroundColor: theme.accent, color: theme.highlight},
                     ]}>
                     Quelques idées de constructions de niches :
                  </Text>
               </View>
               <View
                  style={[
                     styles.main_container,
                     {backgroundColor: theme.secondary},
                  ]}>
                  <Image
                     style={styles.image}
                     source={require('../../../assets/images/Niches/Niche1_1.png')}
                  />
                  <View style={styles.content_container}>
                     <View style={styles.header_container}>
                        <Text
                           style={[
                              styles.title_text,
                              {color: theme.highlight},
                           ]}>
                           Le nichoir Boîte à lettres
                        </Text>
                     </View>
                     <View style={styles.description_container}>
                        <Text
                           style={[
                              styles.description_text,
                              {color: theme.highlight},
                           ]}
                           numberOfLines={6}>
                           C'est le nichoir le plus commun. Le plus facile à
                           construire aussi. Il convient à un grand nombre
                           d'espèces, en particulier aux mésanges, sittelles,
                           etc...
                        </Text>
                     </View>
                  </View>
               </View>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   context: {
      padding: 15,
      textAlign: 'center',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
   },
   list_header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 10,
      fontWeight: 'bold',
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
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
