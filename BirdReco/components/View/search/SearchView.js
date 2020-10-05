import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput, Button } from 'react-native'
import {useNavigation} from "@react-navigation/core";
import DetailItem from '../details/detailItem'
import {getOiseauxListWithSearchedText} from '../../../api/oiseauxList_api'
import OiseauxItem from './OiseauxItem'

class SearchView extends React.Component {

    constructor(props){
        super(props);
        this.searchedText = "";
        this.state = {
            oiseaux: []
        }
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _loadOiseaux() {
        if (this.searchedText.length > 0) {
            getOiseauxListWithSearchedText(this.searchedText).then(data => {
                this.setState({ oiseaux: data })
            })
        }
        else (console.log("Vide"))
    }


    render() {
        //const { navigation } = this.props
        //console.log(getOiseauxListWithSearchedText("Pic vert"));
        console.log(this.state.oiseaux.extract);
        //console.log(this.state.oiseaux);
        //console.log(this.searchedText);

        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder="Nom de l'oiseau"
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._loadOiseaux()}
                />
                <Button color="#9ACD32"  title='Rechercher' onPress={() => this._loadOiseaux()}/>
                <Text style={styles.nom_oiseaux}>{this.state.oiseaux.displaytitle}</Text>
                <Text style={styles.FlatlistItem}>{this.state.oiseaux.extract}</Text>
                <FlatList
                    data={this.state.oiseaux}
                    style={styles.FlatlistItem}
                    keyExtractor={(item) => item}
                    renderItem={({item}) => (
                        <OiseauxItem oiseau={item}/>
                        )}
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
        marginTop: 5
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        height: 50,
        borderColor: '#9ACD32',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10
    },
    nom_oiseaux: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 4
    }
})


export default function(props) {
    const navigation = useNavigation();

    return <SearchView {...props} navigation={navigation}/>
}


