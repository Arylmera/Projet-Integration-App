import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, Button } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import DetailItem from '../details/detailItem'
import {getOiseauxListWithSearchedText} from '../../../api/oiseauxList_api'

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
        const { navigation } = this.props
        //console.log(this.state.oiseauxListe)
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Nom de l'oiseau"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadOiseaux()}
                />
                <Button color="#9ACD32"  title='Rechercher' onPress={() => this._loadOiseaux()}/>
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

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        flexDirection: "column",
    },
    detailButton: {
        borderRadius: 5,
        width: "25%",
        padding: 3,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(126,211,33,0.5)"
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
        borderColor: '#9ACD32',
        borderWidth: 5,
        borderRadius: 10,
        paddingLeft: 10
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <SearchView {...props} navigation={navigation}/>
}


