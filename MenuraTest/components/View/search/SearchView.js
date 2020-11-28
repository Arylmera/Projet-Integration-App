import React from 'react';
import {StyleSheet, View, FlatList, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import DetailItem from '../details/detailItem';
import {getOiseaux} from '../../../api/oiseaux_api';
import {connect} from 'react-redux';
import {LogBox} from 'react-native';
import {SearchBar, Button} from 'react-native-elements';

class SearchView extends React.Component {
   constructor(props) {
      LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
      super(props);
      this.state = {
         oiseauxListe: [],
         emptySearch: true,
         search: '',
         helperText: '',
      };
   }

   /**
    *Récupere le text du TextInput et attribue la valeur search à search
    * @param search
    * @private
    */
   updateSearch = (search) => {
      this.setState({search});
   };

   _loadOiseaux() {
      if (this.state.search.length > 0) {
         getOiseaux(this.state.search)
             .then((data) => {
                if (data.data.length === 0) {
                   this.setState({
                      helperText: 'Oups pas de résultat pour votre recherche',
                      emptySearch: true
                   })
                }
                else {
                   this.setState({
                      oiseauxListe: data.data,
                      emptySearch: false,
                   });
                }
            })
         .catch((error) => {
            console.log(error)
         })
      }
      else {
         this.setState({
            helperText: 'oups aucune carractère n\'est indiqué',
            emptySearch: true
         })
      }
   }

   render() {
      const {search} = this.state;
      let theme = this.props.currentStyle;
      return (
         <View
            style={[styles.main_container, {backgroundColor: theme.primary}]}>
            <View style={[styles.search_container]}>
               <SearchBar
                  containerStyle={[
                     styles.search_bar,
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}
                  inputContainerStyle={[
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}
                  inputStyle={[
                     styles.search_bar_input,
                     {color: theme.highlight},
                  ]}
                  placeholder="Entrez un nom d'oiseau"
                  placeholderTextColor={theme.highlight}
                  onChangeText={this.updateSearch}
                  searchIcon={{color: theme.highlight}}
                  clearInput={{color: theme.highlight}}
                  value={search}
                  onSubmitEditing={() => this._loadOiseaux()}
               />
               <Button
                  titleStyle={{color: theme.highlight}}
                  buttonStyle={[
                     styles.button_search,
                     {backgroundColor: theme.accent},
                  ]}
                  title="Rechercher"
                  onPress={() => this._loadOiseaux()}
               />
            </View>
            {this.state.emptySearch ? (
               <View style={styles.loading_placeholder}>
                  <Text
                      style={[styles.helperText, {color: theme.accent}]}
                  >
                     {this.state.helperText}
                  </Text>
                  <Image
                     style={[
                        styles.image_placeholder,
                        {tintColor: theme.highlight},
                     ]}
                     source={require('../../../assets/images/searchImage.png')}
                  />
               </View>
            ) : (
               <FlatList
                  data={this.state.oiseauxListe}
                  style={styles.FlatlistItem}
                  keyExtractor={(item) => item.nom}
                  renderItem={({item}) => (
                     <DetailItem
                        data={{oiseau: item, root: 'SearchView'}}
                     />
                  )}
               />
            )}
         </View>
      );
   }
}

let styles = StyleSheet.create({
   main_container: {
      flex: 1,
      flexDirection: 'column',
   },
   search_container: {
      paddingTop: 5,
   },
   FlatlistItem: {
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
   },
   search_bar: {
      margin: 10,
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      borderRadius: 10,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
   },
   search_bar_input: {

   },
   button_search: {
      borderRadius: 5,
      marginLeft: 100,
      marginRight: 100,
      marginBottom: 10,
   },
   loading_placeholder: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
   },
   image_placeholder: {
      flex: 1,
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
      opacity: 0.4,
   },
   helperText: {
      marginTop: 10,
      fontSize: 18,
      opacity: 0.6,
   },
});

const mapStateToProps = (state) => {
   return {
      currentStyle: state.currentStyle,
   };
};

export default connect(mapStateToProps)(function (props) {
   const navigation = useNavigation();
   return <SearchView {...props} navigation={navigation} />;
});
