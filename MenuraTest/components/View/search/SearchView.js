import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Button,
  Image,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import DetailItem from '../details/detailItem';
import {getOiseauxListWithSearchedText} from '../../../api/oiseauxList_api';
import {connect} from 'react-redux';

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = '';
    this.state = {
      oiseauxListe: [],
      oiseauxListeNom: [],
      isLoading: true,
    };
  }

  /**
   *Récupere le text du TextInput et attribue la valeur text a searchedText
   * @param text
   * @private
   */
  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _loadOiseaux() {
    if (this.searchedText.length > 0) {
      getOiseauxListWithSearchedText(this.searchedText).then((data) => {
        this.setState({oiseauxListe: data.data});
        let oiseauxListNom_loading = [];
        data.data.forEach((oiseau) => oiseauxListNom_loading.push(oiseau.nom));
        this.setState({
          oiseauxListeNom: oiseauxListNom_loading,
          isLoading: false,
        });
      });
    }
  }

  render() {
    const {navigation} = this.props;
    let theme = this.props.currentStyle;
    return (
      <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
        <View style={[styles.search_container]}>
          <TextInput
            style={[styles.textinput, {borderColor: theme.highlight, backgroundColor: theme.primary}]}
            placeholder="Entrez un nom d'oiseau"
            onChangeText={(text) => this._searchTextInputChanged(text)}
            onSubmitEditing={() => this._loadOiseaux()}
          />
          <Button
            color={theme.highlight}
            title="Rechercher"
            onPress={() => this._loadOiseaux()}
          />
        </View>
        {this.state.isLoading ? (
          <View style={styles.loading_placeholder}>
            <Image
              style={[styles.image_placeholder, {tintColor: theme.highlight}]}
              source={require('../../../assets/images/searchImage.png')}
            />
          </View>
        ) : (
          <FlatList
            data={this.state.oiseauxListeNom}
            style={styles.FlatlistItem}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <DetailItem data={{oiseau_nom: item, root: 'SearchView'}} />
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
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    height: 50,
    borderWidth: 1.5,
    borderRadius: 10,
    paddingLeft: 10,
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
