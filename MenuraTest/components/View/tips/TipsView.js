import React from 'react';
import {
   View,
   StyleSheet,
   Text,
   ScrollView,
   Image,
   ActivityIndicator,
} from 'react-native';
import TipsItem from './TipsItem';
import {connect} from 'react-redux';
import {ButtonGroup, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/core';
import {Divider} from 'react-native-paper';
import saisons from './data/TipsDataSaison';

class TipsView extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedIndex: 0,
      };
      this.updateIndex = this.updateIndex.bind(this);
   }

   /**
    * chargement du component
    */
   componentDidMount() {
      this._saisonDate();
   }

   /**
    * chargement de la bonne saison
    */
   _saisonDate() {
      let today = new Date();
      let spring = new Date(today.getFullYear(), 2, 21);
      let summer = new Date(today.getFullYear(), 5, 21);
      let autumn = new Date(today.getFullYear(), 8, 21);
      let winter = new Date(today.getFullYear(), 11, 21);

      if (today < winter && today >= autumn) {
         this.setState({selectedIndex: 0});
      } else if (today < spring && today >= winter) {
         this.setState({selectedIndex: 1});
      } else if (today < summer && today >= spring) {
         this.setState({selectedIndex: 2});
      } else if (today < autumn && today >= summer) {
         this.setState({selectedIndex: 3});
      }
   }

   updateIndex(selectedIndex) {
      this.setState({selectedIndex});
   }

   render() {
      const {navigation} = this.props;
      const component1 = () => <Text>Automne</Text>;
      const component2 = () => <Text>Hiver</Text>;
      const component3 = () => <Text>Printemps</Text>;
      const component4 = () => <Text>Été</Text>;
      const buttons = [
         {element: component1},
         {element: component2},
         {element: component3},
         {element: component4},
      ];
      const {selectedIndex} = this.state;
      let theme = this.props.currentStyle;
      return (
         <ScrollView
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View>
               <View
                  style={[styles.context, {backgroundColor: theme.secondary}]}>
                  <ButtonGroup
                     onPress={this.updateIndex}
                     selectedIndex={selectedIndex}
                     buttons={buttons}
                     containerStyle={[
                        styles.button_groupe_saison,
                        {
                           borderColor: theme.secondary,
                           backgroundColor: theme.primary,
                        },
                     ]}
                     selectedButtonStyle={{backgroundColor: theme.accent}}
                     textStyle={{color: theme.highlight}}
                     innerBorderStyle={{width: 0.2, color: 'black'}}
                  />
                  <View
                     style={[
                        styles.list_header,
                        {backgroundColor: theme.accent},
                     ]}>
                     <Text
                        style={[
                           styles.list_header_caption,
                           {
                              color: theme.highlight,
                           },
                        ]}>
                        Aider les oiseaux des jardins au fil des saisons :
                     </Text>
                  </View>
               </View>

               <TipsItem
                  data={{infos_saison: saisons[this.state.selectedIndex]}}
               />
            </View>
            <View
                style={[
                   styles.item_container,
                   {backgroundColor: theme.secondary},
                ]}>
               <View
                   style={[
                      styles.container_item,
                      {backgroundColor: theme.secondary},
                   ]}>
                  <Text style={[styles.title_text, {color: theme.highlight}]}>
                     Construction nichoirs
                  </Text>
               </View>
               <Divider style={[{backgroundColor: theme.highlight}]} />
               <View
                   style={[
                      styles.item,
                      {backgroundColor: theme.secondary, color: theme.highlight},
                   ]}>
                  <Image
                      style={styles.image}
                      PlaceholderContent={<ActivityIndicator />}
                      source={require('../../../assets/images/Niches/Niche1_3.png')}
                  />
                  <Text style={[styles.item_text, {color: theme.highlight}]}>
                     Idées de constructions avec modèles détaillés
                  </Text>
                  <Button
                      titleStyle={{color: theme.highlight}}
                      buttonStyle={[
                         styles.button,
                         {
                            backgroundColor: theme.accent,
                         },
                      ]}
                      onPress={() => navigation.navigate('TipsNiche')}
                      title="A vos marteaux !"
                  />
               </View>
            </View>
            <View
               style={[
                  styles.item_container,
                  {backgroundColor: theme.secondary},
               ]}>
               <View
                  style={[
                     styles.container_item,
                     {backgroundColor: theme.secondary},
                  ]}>
                  <Text style={[styles.title_text, {color: theme.highlight}]}>
                     Construction mangeoires
                  </Text>
               </View>
               <Divider style={[{backgroundColor: theme.highlight}]} />
               <View
                  style={[
                     styles.item,
                     {backgroundColor: theme.secondary, color: theme.highlight},
                  ]}>
                  <Image
                     style={styles.image}
                     PlaceholderContent={<ActivityIndicator />}
                     source={require('../../../assets/images/Mangeoires/Mangeoire1_1.png')}
                  />
                  <Text style={[styles.item_text, {color: theme.highlight}]}>
                     Des bonnes idées de de mangeoires
                  </Text>
                  <Button
                     titleStyle={{color: theme.highlight}}
                     buttonStyle={[
                        styles.button,
                        {
                           backgroundColor: theme.accent,
                        },
                     ]}
                     onPress={() => navigation.navigate('TipsMangeoire')}
                     title="A Table !"
                  />
               </View>
            </View>
            <View
               style={[
                  styles.item_container,
                  {backgroundColor: theme.secondary},
               ]}>
               <View
                  style={[
                     styles.container_item,
                     {backgroundColor: theme.secondary},
                  ]}>
                  <Text style={[styles.title_text, {color: theme.highlight}]}>
                     Quiz
                  </Text>
               </View>
               <Divider style={[{backgroundColor: theme.highlight}]} />
               <View
                  style={[
                     styles.item,
                     {backgroundColor: theme.secondary, color: theme.highlight},
                  ]}>
                  <Image
                     style={styles.image}
                     PlaceholderContent={<ActivityIndicator />}
                     source={require('../../../assets/images/Accueil.png')}
                  />
                  <Text style={[styles.item_text, {color: theme.highlight}]}>
                     Pourrez vous reconnaitre ces oiseaux ?
                  </Text>
                  <Button
                     titleStyle={{color: theme.highlight}}
                     buttonStyle={[
                        styles.button,
                        {
                           backgroundColor: theme.accent,
                        },
                     ]}
                     onPress={() => navigation.navigate('TipsQuiz')}
                     title="Let's play"
                  />
               </View>
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   main_container: {
      flex: 1,
   },
   item_container: {
      flexDirection: 'column',
      margin: 10,
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
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
   context_text: {
      fontSize: 18,
      width: '100%',
   },
   tips_list: {
      marginLeft: 5,
      marginRight: 5,
   },
   list_header: {
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
   },
   list_header_caption: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      padding: 20,
      margin: 3,
   },
   button: {
      borderRadius: 5,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
   },
   nichoire: {
      borderRadius: 5,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 3,
   },
   container_item: {
      flex: 1,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
   },
   title_text: {
      fontSize: 28,
      textAlign: 'center',
      padding: 5,
   },
   item: {
      flex: 3,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      fontSize: 14,
   },
   item_text: {
      margin: 15,
      textAlign: 'center',
      fontStyle: 'italic',
   },
   image: {
      width: null,
      height: 150,
      borderRadius: 4,
      flex: 1,
      resizeMode: 'contain',
   },
   button_groupe_saison: {
      borderRadius: 5,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 10,
      height: 40,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <TipsView {...props} navigation={navigation} />;
});
