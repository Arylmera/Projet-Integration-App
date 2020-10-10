import React from 'react'
import { StyleSheet, View, FlatList, TextInput, Button } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import DetailItem from '../details/detailItem'
import {getOiseauxListWithSearchedText} from '../../../api/oiseauxList_api'
import {connect} from "react-redux"

class SearchView extends React.Component {

    constructor(props){
        super(props);
        this.searchedText = "";
        this.state={
            oiseauxListe: ["Mésange","Pic vert","Moineau","Bergeronnette grise","Buse variable","Chardonneret élégant","Bruant Jaune","Paridae"]
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _loadOiseaux() {
        if (this.searchedText.length > 0) {
            let data = getOiseauxListWithSearchedText(this.searchedText);
            this.setState({ oiseauxListe: data });

        }
        else(this.setState({ oiseauxListe: ["Mésange","Pic vert","Moineau","Bergeronnette grise","Buse variable","Chardonneret élégant","Bruant Jaune","Paridae"] }));
    }

    render() {
        const { navigation } = this.props;
        let theme = this.props.currentStyle;
        return (
            <View style={[styles.main_container, {backgroundColor: theme.primary}]}>
                <TextInput
                    style={[styles.textinput, {borderColor: theme.accent}]}
                    placeholder="Nom de l'oiseau"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadOiseaux()}
                />
                <Button color={theme.accent} title='Rechercher' onPress={() => this._loadOiseaux()}/>
                <FlatList
                    data={this.state.oiseauxListe}
                    style={styles.FlatlistItem}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <DetailItem data={{oiseau_nom: item, root: 'SearchView'}}/>
                    )}

                />
            </View>
        )
    }
}

let styles = StyleSheet.create({
    main_container: {
        flex: 1,
        paddingTop: 5,
        flexDirection: "column",
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
        borderWidth: 5,
        borderRadius: 10,
        paddingLeft: 10
    }
})

const mapStateToProps = state => {
    return {
        currentStyle: state.currentStyle
    }
}

export default connect(mapStateToProps)(function(props) {
    const navigation = useNavigation();
    return <SearchView {...props} navigation={navigation}/>
})


