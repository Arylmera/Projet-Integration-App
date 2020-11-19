import React from 'react';
import {StyleSheet, View, FlatList, Image} from 'react-native';
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
         oiseauxListeNom: [],
         isLoading: true,
         search: '',
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
         getOiseaux(this.state.search).then((data) => {
            this.setState({oiseauxListe: data.data});
            let oiseauxListNom_loading = [];
            data.data.forEach((oiseau) =>
               oiseauxListNom_loading.push(oiseau.nom),
            );
            this.setState({
               oiseauxListeNom: oiseauxListNom_loading,
               isLoading: false,
            });
         });
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
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}
                  inputContainerStyle={[
                     {backgroundColor: theme.accent, color: theme.highlight},
                  ]}
                  inputStyle={{color: theme.highlight}}
                  placeholder="Entrez un nom d'oiseau"
                  placeholderTextColor={theme.highlight}
                  onChangeText={this.updateSearch}
                  value={search}
                  onSubmitEditing={() => this._loadOiseaux()}
               />
               <Button
                  titleStyle={{color: theme.highlight}}
                  buttonStyle={{
                     borderRadius: 5,
                     marginLeft: 0,
                     marginRight: 0,
                     marginBottom: 0,
                     backgroundColor: theme.accent,
                  }}
                  title="Rechercher"
                  onPress={() => this._loadOiseaux()}
               />
            </View>
            {this.state.isLoading ? (
               <View style={styles.loading_placeholder}>
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
                  data={this.state.oiseauxListeNom}
                  style={styles.FlatlistItem}
                  keyExtractor={(item) => item}
                  renderItem={({item}) => (
                     <DetailItem
                        data={{oiseau_nom: item, root: 'SearchView'}}
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
   textinput: {
      marginLeft: 10,
      marginRight: 10,
      marginTop: 5,
      height: 50,
      borderRadius: 10,
      paddingLeft: 10,
      // shadow
      shadowColor: 'rgba(0,0,0, .7)',
      shadowOffset: {height: 0, width: 0},
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
   },
   loading_placeholder: {
      flex: 1,
      flexDirection: 'column',
   },
   image_placeholder: {
      flex: 1,
      resizeMode: 'contain',
      height: '100%',
      width: '100%',
      opacity: 0.4,
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
