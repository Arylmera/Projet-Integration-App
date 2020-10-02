import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, Button } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import DetailItem from '../details/detailItem'
import {getOiseauxListWithSearchedText} from '../../../api/oiseauxList_api'
import OiseauxItem from "./OiseauxItem";

class SearchView extends React.Component {

    constructor(props){
        super(props);
        this.searchedText = "";
        this.state = {
            oiseaux: []
        }
    }

    _searchTextInputChanged(text) {
        this.setState({ searchedText: text })
    }

    _loadOiseaux() {
        if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
            getOiseauxListWithSearchedText(this.searchedText).then(data => {
                this.setState({ oiseaux: data })
            })
        }
    }



    render() {
        const { navigation } = this.props
        console.log(getOiseauxListWithSearchedText("Mésange"));
        console.log(this.state.oiseaux);

        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Nom de l'oiseau"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadOiseaux()}
                />
                <Button title='Rechercher' onPress={() => this._loadOiseaux()}/>
                <FlatList
                    data={this.state.oiseaux}
                    style={styles.FlatlistItem}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <OiseauxItem oiseau={item}/>}
                    /*keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <DetailItem data={item}/>*/

                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        //flexDirection: "row",
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
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

export default function(props) {
    const navigation = useNavigation();

    return <SearchView {...props} navigation={navigation}/>
}


